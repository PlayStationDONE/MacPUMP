---
title: Power by app
description: How MacPUMP estimates each app’s power, and how to read the list.
order: 4
group: Using MacPUMP
---

The **App power (estimated)** list in the popover and the **Apps** tab in the dashboard rank your apps by the power they’re using.

## Reading the list

- **One row per app.** Helper processes are added to the app that started them, so a browser’s many processes appear as one row.
- **The bars compare apps with each other.** They don’t include the last row, which would otherwise flatten every bar.
- **Not assigned to apps** is everything that can’t be put down to a single app: the display, the graphics chip, macOS’s own background work and more. It is often the biggest number on screen, and it is **not** an idle figure. A large value means your Mac is busy.
- **App history** in the Apps tab covers the last 15 minutes up to 30 days, depending on how long you keep history.

## How it’s estimated

macOS keeps a running total of the processor energy it bills to each process. MacPUMP reads it every 3 seconds and turns the change into watts. This needs no administrator access for your own apps; processes owned by the system are skipped, never guessed at.

That total counts **processor energy**, not the whole machine. In a controlled test it tracked real power closely but captured roughly half of it; the rest is chip overhead, memory and power-supply losses that no single app is billed for. That’s why per-app figures are labelled **Estimated** and are never made to add up to your Mac’s total.

Apple doesn’t publish true per-app watts. Activity Monitor shows a unitless *Energy Impact* for the same reason.

## What’s keeping your Mac awake

In Advanced mode, the **Activity** tab lists the requests that are currently stopping your Mac from sleeping. Several entries from macOS itself are normal. If your battery drains while the lid is closed, look here for an app that shouldn’t be on the list.
