---
title: Shortcuts, links and scripts
description: Keyboard shortcuts, custom menu bar text, macpump:// links and the --status command.
order: 8
group: Reference
---

## Keyboard shortcuts

| Shortcut | What it does |
| --- | --- |
| ⌥⌘P | Open the popover from anywhere. You can change it in Settings. |
| ⌘1 – ⌘5 | Switch dashboard tabs (View menu). |
| ⌘, | Open Settings. |

## Custom menu bar text (Advanced)

Write your own menu bar text with values in braces, for example `CPU {cpu} · {temp}`.

| Value | Shows |
| --- | --- |
| `{charge}` | Battery charge |
| `{mac}` | Mac power use |
| `{adapter}` | Adapter power, or “unplugged” |
| `{battery}` | Battery power, + while charging, − while draining |
| `{left}` | Time left if you unplug |
| `{cpu}`, `{gpu}` | Processor and graphics usage |
| `{mem}`, `{memp}` | Memory used, as an amount and a percentage |
| `{temp}` | Hottest temperature |
| `{fan}` | Fan speed |
| `{down}`, `{up}` | Network download and upload speed |
| `{read}`, `{write}` | Disk read and write speed |

A value your Mac doesn’t provide is left out.

## macpump:// links

Links let Shortcuts, scripts and other apps drive MacPUMP’s interface. They can only show and open things; **a link can’t read, export or delete anything**. You can turn links off in Settings.

| Link | What it does |
| --- | --- |
| `macpump://overlay/toggle` | Show or hide the floating overlay (`show` and `hide` also work) |
| `macpump://popover/toggle` | Open or close the popover |
| `macpump://dashboard/open?tab=CPU` | Open the dashboard on a tab |
| `macpump://settings/open?pane=Alerts` | Open a Settings pane |
| `macpump://profile/apply?name=Battery%20saver` | Apply a saved profile |

## The --status command

Run the app’s executable with `--status` to print the current readings as JSON, for scripts:

```bash
/Applications/MacPUMP.app/Contents/MacOS/MacPUMP --status
```

It reports battery (charge, plugged in, charging, adapter, battery and Mac watts, health and cycles), CPU, GPU, memory, disk and network figures, taking about a second to sample. Readings your Mac doesn’t provide are left out.
