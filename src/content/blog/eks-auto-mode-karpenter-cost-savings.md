---
title: "How we cut $50k/year off our AWS bill with EKS Auto Mode and Karpenter"
description: "Moving from fixed-size node groups to EKS Auto Mode (Karpenter under the hood), and the gotchas we hit along the way."
pubDate: 2026-10-03
tags: ["kubernetes", "aws", "finops", "karpenter"]
---

Our VPCs had originally been created by hand in the AWS console, and our EKS clusters ran on managed node groups
with a fixed number of instances. Over the course of this project, I moved the entire network into Terraform,
created private subnets and migrated all of our infrastructure into them, and finally moved the clusters to
dynamic node scaling. The result was about **$50k/year** in AWS compute savings, with zero service disruption.

<div class="stats">
  <div><strong>$50k/yr</strong><span>AWS compute saved</span></div>
  <div><strong>~30%</strong><span>idle extra capacity before</span></div>
  <div><strong>0</strong><span>service disruption</span></div>
</div>

![Before and after: a fixed node group with idle extra capacity, and nodes sized to the pods](./images/node-capacity.svg)

## The problem with fixed node groups

Our clusters used EKS managed node groups with a fixed instance count. We sized them roughly 30% above what the
cluster actually needed, so that there would always be room when pods had to scale. This had a few consequences:

- The cluster sat idle most of the time, in every environment, and production was the worst case.
- We paid for that extra 30% around the clock.
- Choosing the right instance type for a mixed workload was always guesswork.

## Starting with an investigation

Before committing to anything, we ran an investigation to find out whether migrating to EKS Auto Mode was even
possible for us.

The main blocker was our load balancers. We were using Classic Load Balancers, which operate at layer 4, and EKS
Auto Mode works with Application Load Balancers, which operate at layer 7. That is not a like-for-like swap, so
the real question was how to get from one to the other without breaking anything.

To answer it, we built a proof of concept: a separate EKS cluster, set up with an ALB and a handful of
application workloads, to act as a migration cluster. Running real workloads behind the new load balancer showed
us what the migration would involve before we touched anything in production.

## What changed

Once the investigation showed the migration was feasible, we moved to EKS Auto Mode, which runs
[Karpenter](https://karpenter.sh/) for you. Nodes are created only when pods need them, so the cluster scales
easily and we now run nodes that match what our systems actually require. A few notes from the migration:

- **Keep `Consolidation` enabled.** Karpenter will bin-pack workloads and terminate nodes that are underused.
- **Set `NodePool` limits.** Without them, one misbehaving deployment can scale up a large number of expensive
  instances very quickly.
- **Mix Spot and On-Demand** in the `NodePool` requirements, but keep critical system workloads (ingress
  controllers, DNS) on On-Demand using taints and tolerations.
- **Check your pod disruption budgets.** Consolidation will happily evict pods to pack things more efficiently,
  so make sure your PDBs reflect what you can really tolerate.

## How we kept it safe

We never modified the existing clusters. Instead, we built new EKS clusters alongside them and moved over using a
blue/green approach. This also let us start on the latest Kubernetes version available at the time.

![Blue/green migration from the old EKS clusters to new EKS Auto Mode clusters](./images/blue-green.svg)

The move brought two more benefits. We finally retired the Classic Load Balancers in favour of ALBs. And with
ALBs in place, we could set up AWS WAF to restrict access to our systems, reduce bot traffic and block
high-risk countries.

## The outcome

We saved about $50k/year in AWS compute, and there was no service disruption during the migration. The main
lesson for me is that the savings from autoscaling come from being able to *scale down* quickly and safely, not
only from scaling up.
