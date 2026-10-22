---
title: History and export
description: What MacPUMP records, how long it keeps it, and how to export or delete it.
order: 5
group: Using MacPUMP
---

## What’s recorded

MacPUMP keeps a power sample every 5 seconds, stored only on your Mac. In Advanced mode it can also keep history for apps, temperature, CPU, GPU, memory, disk and network. Each one can be switched off in Settings.

## How long it’s kept

**7 days** by default, or **30 days** if you choose. Older samples are removed automatically. Each history’s retention can also be set on its own.

## Power History

The **Power History** tab in the dashboard covers the last **15 minutes, 1 hour, 6 hours, 24 hours, 7 days or 30 days**. For the range you pick it shows:

- **Summary cards:** energy used, average, peak and minimum power.
- **A power chart** with an average line, and the energy used per interval.
- **Battery history** and a **battery health trend**.
- **An estimated resting power:** roughly what your Mac uses when it’s doing very little.

When your Mac was asleep, off or not recording, the chart is left **blank**. Gaps are never counted as 0 W, so they can’t pull your averages down.

## Export

Every history can be saved as a **CSV file** for Numbers, Excel or Power BI:

- from its own tab in the dashboard,
- from the **File** menu (including *Export Everything (Last 7 Days)*), or
- from **Settings**.

Exports are written only to a place you choose in the save panel. You can hide app names in exports, and there is a weekly report you can save too.

## Where it’s stored, and deleting it

History lives in `~/Library/Application Support/MacPUMP/`, in a folder only your user account can read. You can see how much space it uses, export it or delete it from **Settings › Data & Privacy**. Resetting MacPUMP’s settings never touches your history.
