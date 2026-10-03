---
title: "How we cut $50k/year off our AWS bill with EKS Auto Mode and Karpenter"
description: "Moving from fixed-size node groups to EKS Auto Mode (Karpenter under the hood), and the gotchas we hit along the way."
pubDate: 2026-10-03
tags: ["kubernetes", "aws", "finops", "karpenter"]
---

Our VPCs had been created by hand in the AWS console, and our EKS clusters ran on managed node groups with a
fixed number of instances. I moved the whole network into Terraform, created private subnets and moved all the
infrastructure into them, and then moved the clusters to dynamic node scaling. That saved about **$50k/year** in
AWS compute, and we had zero service disruption.

<div class="stats">
  <div><strong>$50k/yr</strong><span>AWS compute saved</span></div>
  <div><strong>~30%</strong><span>idle extra capacity before</span></div>
  <div><strong>0</strong><span>service disruption</span></div>
</div>

![Before and after: a fixed node group with idle extra capacity, and nodes sized to the pods](./images/node-capacity.svg)

## The problem with fixed node groups

Our clusters used EKS managed node groups with a fixed count. We sized them about 30% above what the cluster
actually needed, so there would be room if pods had to scale. That meant:

- The cluster was idle most of the time, in every environment. Production was the worst.
- We paid for that extra 30% all day, every day.
- Picking the right instance type for a mixed workload was always a guess.

## What changed

We moved to EKS Auto Mode, which runs [Karpenter](https://karpenter.sh/) for you. Nodes get created when pods need
them, so the cluster scales nodes easily and we run the exact size of nodes the systems need to work. A few notes
from the migration:

- **Keep `Consolidation` enabled.** Karpenter will bin-pack and terminate nodes that are underused.
- **Set `NodePool` limits.** One bad deployment can otherwise scale up a lot of expensive instances very fast.
- **Mix Spot and On-Demand** in the `NodePool` requirements, but keep critical system workloads (ingress
  controllers, DNS) on On-Demand with taints and tolerations.
- **Check your pod disruption budgets.** Consolidation will happily evict pods to pack things better, so make
  sure your PDBs match what you can really tolerate.

## How we kept it safe

We didn't touch the old clusters. We built new EKS clusters next to them and moved over with a blue/green
approach. That also let us start on the latest Kubernetes version available at the time.

![Blue/green migration from the old EKS clusters to new EKS Auto Mode clusters](./images/blue-green.svg)

We got two other things out of it. We finally retired the Classic Load Balancers and moved to ALBs. With ALBs in
place we could set up AWS WAF, which lets us restrict access to our systems, cut bot traffic and block
high-risk countries.

## The outcome

About $50k/year saved in AWS compute, and no service disruption during the migration. The main thing I took from
this: the savings come from being able to *scale down* fast and safely, not only scale up.
