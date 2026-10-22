---
title: How MacPUMP measures power
description: Where every reading comes from, which ones are estimates, and what MacPUMP deliberately doesn’t show.
order: 7
group: Reference
---

MacPUMP reads only what macOS makes available to a normal user. It never asks for administrator access, so some detailed figures have to be estimated, and a few aren’t available at all. Every number is labelled so you can tell which is which.

| Label | Meaning |
| --- | --- |
| **Measured** | Read directly from a sensor in your Mac. |
| **Calculated** | Worked out exactly from measured readings. |
| **Estimated** | A model’s best figure, with its known limits. |
| **Unavailable** | Your Mac doesn’t provide it, so nothing is shown. |

## Sources

| Source | Used for | Refresh |
| --- | --- | --- |
| SMC (`PDTR`, `B0AC`, `B0AV`) | Adapter power, battery current and voltage | About 1 s |
| `IOPowerSources` | Charge, cable state, charging, time remaining | On change |
| `AppleSmartBattery` | Health, cycles, temperature, adapter details, pack capacity | About 60 s |
| `proc_pid_rusage` | Energy per process, for the app list | 3 s |
| IOReport energy counters | Graphics (GPU) power, when the counter advances | 1 s |
| SMC `PSTR` | Cross-check of the derived system load | About 1 s |

`AppleSmartBattery` republishes its live power figures only about once a minute, which is too slow for a live diagram. The SMC exposes the same quantities as sensors that update every second, so that’s what the diagram uses.

## Each reading

- **Adapter power** is measured: the power the adapter delivers to the Mac.
- **Battery power** is calculated from the battery’s current and voltage.
- **Mac power use** is calculated as adapter power minus battery power, so the diagram always balances. It is never read as a separate sensor.
- **Graphics (GPU) power** is measured from macOS’s energy counters, on Macs where that counter updates.
- **Processor (CPU) power** is estimated from processor activity, calibrated against Apple’s `powermetrics` on an M1 Pro (about 1.2 W error there). On other chips the same formula is used, with a note that it hasn’t been validated.
- **Display power** is estimated from screen brightness (backlight only): about 1 W error on the Mac it was measured on, flagged as unvalidated elsewhere.
- **Power per app** is estimated from the processor energy macOS bills to each app. See [Power by app](/docs/per-app-power).
- **Power at the wall** is estimated from macOS’s own adapter-loss figure. It hasn’t been checked against a plug-in meter.
- **Time left if you unplug** is estimated from the remaining battery energy, at the battery’s nominal voltage, over your average power use in the last 60 seconds.
- **Neural Engine, memory and total chip power** are unavailable. They need administrator access, and MacPUMP doesn’t invent them.

## Tested on

MacPUMP was developed and properly tested on a 14-inch MacBook Pro with an M1 Pro. On other Apple silicon Macs the results may vary a little. Core and graphics speeds come from unpublished macOS information, and graphics speed is checked on the M1 Pro only. Intel Macs fall back to slower figures that refresh about once a minute.

The sensor and energy-counter interfaces MacPUMP reads are undocumented by Apple and may change in future macOS releases. When a reading isn’t there, MacPUMP shows nothing rather than a guess.
