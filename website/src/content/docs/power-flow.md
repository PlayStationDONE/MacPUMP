---
title: Reading the power diagram
description: What the battery bar, the power-flow diagram and the time-left figure in the popover mean.
order: 3
group: Using MacPUMP
---

## The battery bar

The blue bar at the top is your battery’s charge. The small symbols on it show whether a power adapter is connected and whether the battery is charging.

### Charge markers

The **handle** and the **dashed line** on the bar are charge markers. Drag the handle to set a target and the dashed line to set a floor. MacPUMP notifies you when your charge crosses one of them.

> Charge markers **never change how your Mac charges**. They are reminders only. MacPUMP reads your Mac; it doesn’t control it.

## The power-flow diagram

Power comes **in** on the left and is **used** on the right. The width of each band is proportional to its watts.

- **Adapter** (plug symbol): the power your adapter is delivering to the Mac.
- **Battery**: on the left while it is draining (a source), on the right while it is charging (a destination), and absent when it is idle.
- **Mac** (laptop symbol): the power your Mac is using.

The three always balance: your Mac’s power use is the adapter’s power minus what goes into the battery. The diagram updates about once a second, from your Mac’s power sensors.

### The four situations you’ll see

| Situation | What the diagram shows |
| --- | --- |
| On battery | Battery → Mac |
| Charging | Adapter → Mac and Adapter → Battery |
| Plugged in, fully charged | Adapter → Mac |
| Plugged in, working hard | Adapter → Mac and Battery → Mac, when the Mac needs more than the adapter supplies |

## Time left if you unplug

This is how long the battery would last if you unplugged now: the energy left in the battery divided by your Mac’s average power use over the last minute. It answers the same question whether or not a cable is attached, and it’s labelled **Estimated**.

The average is deliberately taken over a minute. An estimate from a single instant would swing between one hour and five as your Mac’s load spikes.

## On a Mac without a battery

The popover says so rather than drawing an empty diagram.
