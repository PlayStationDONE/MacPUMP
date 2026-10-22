/**
 * Feature descriptions, dashboard tabs, measurement provenance and the FAQ. Every entry was checked against the app's
 * source and docs (README.md, docs/MEASUREMENT_METHODOLOGY.md, docs/FEATURE_VERIFICATION.md). Do not add a feature
 * here until it ships, and keep estimates labelled as estimates.
 */

export type IconName = 'flow' | 'clock' | 'apps' | 'chart' | 'badge' | 'lock';

export const overview: { icon: IconName; title: string; text: string; href: string }[] = [
  {
    icon: 'flow',
    title: 'Live power flow',
    text: 'Adapter, battery and Mac, updated about once a second. The three always add up.',
    href: '#power',
  },
  {
    icon: 'clock',
    title: 'Battery time left',
    text: 'How long the battery would last if you unplugged now, from your average use over the last minute.',
    href: '#power',
  },
  {
    icon: 'apps',
    title: 'Power by app',
    text: 'Which apps are using the most power, estimated from the energy macOS itself records for each app.',
    href: '#apps',
  },
  {
    icon: 'chart',
    title: 'History on your Mac',
    text: 'From the last 15 minutes to 30 days: energy used, averages, peaks and a battery health trend.',
    href: '#history',
  },
  {
    icon: 'badge',
    title: 'Honest numbers',
    text: 'Every figure is labelled Measured, Calculated or Estimated. If your Mac has no reading, MacPUMP shows none.',
    href: '#numbers',
  },
  {
    icon: 'lock',
    title: 'Private by design',
    text: 'No account, no tracking, no network connections. Your history never leaves your Mac.',
    href: '#privacy',
  },
];

/** Sample readings for the power-flow demonstration. They match the app's own sample states, not a real Mac. */
export const demoStates = [
  {
    id: 'heavy',
    label: 'Heavy load',
    title: 'Plugged in, working hard',
    note: 'The Mac needs more than the adapter supplies, so the battery makes up the difference.',
    percent: 79,
    adapter: 87.77,
    battery: -16.92,
    runtime: '31m',
  },
  {
    id: 'charging',
    label: 'Charging',
    title: 'Charging',
    note: 'The adapter powers the Mac and charges the battery at the same time.',
    percent: 42,
    adapter: 61.4,
    battery: 26.15,
    runtime: '50m',
  },
  {
    id: 'battery',
    label: 'On battery',
    title: 'On battery',
    note: 'No adapter. Everything the Mac uses comes from the battery.',
    percent: 63,
    adapter: 0,
    battery: -14.32,
    runtime: '3h 5m',
  },
  {
    id: 'full',
    label: 'Fully charged',
    title: 'Plugged in, fully charged',
    note: 'The battery is full and idle, so the adapter powers the Mac on its own.',
    percent: 100,
    adapter: 19.04,
    battery: 0,
    runtime: '3h 40m',
  },
] as const;

export const dashboardTabs: { name: string; lite: boolean; text: string }[] = [
  {
    name: 'Power',
    lite: true,
    text: 'Every power reading with its Measured, Calculated, Estimated or Unavailable label, graphics power where your Mac exposes it, session statistics and the power-flow diagram.',
  },
  {
    name: 'Power History',
    lite: true,
    text: 'Energy, average, peak and minimum for the last 15 minutes to 30 days, a power chart with an average line, energy per interval, battery history, a battery health trend and an estimated resting power.',
  },
  {
    name: 'Apps',
    lite: true,
    text: 'Live estimated power per app, plus a history of the top apps, stored on your Mac.',
  },
  {
    name: 'Temperature',
    lite: true,
    text: 'The thermal status macOS reports, the temperature of each part of your Mac, fan speed and a 7-day history.',
  },
  {
    name: 'CPU',
    lite: false,
    text: 'Usage, per-core activity, calculated core speed with its limits explained, estimated processor power, an efficiency summary and history.',
  },
  {
    name: 'GPU',
    lite: false,
    text: 'Usage, graphics power, memory, calculated speed on supported chips, the apps using the GPU and history.',
  },
  {
    name: 'Memory',
    lite: false,
    text: 'Which apps are using memory, with history.',
  },
  {
    name: 'Disk',
    lite: false,
    text: 'Which apps are reading and writing to disk, with history.',
  },
  {
    name: 'Network',
    lite: false,
    text: 'Which apps are using the network, with speeds in bytes or bits and history.',
  },
  {
    name: 'Activity',
    lite: false,
    text: 'Processor, memory and disk use per app, and what is keeping your Mac awake.',
  },
  {
    name: 'Sensors',
    lite: false,
    text: 'Which sensors your Mac provides, and where each figure on screen comes from.',
  },
];

export type Kind = 'measured' | 'calculated' | 'estimated' | 'unavailable';

export const provenance: { reading: string; kind: Kind; how: string }[] = [
  { reading: 'Adapter power', kind: 'measured', how: 'Read from the Mac’s power sensors about once a second.' },
  {
    reading: 'Battery power',
    kind: 'calculated',
    how: 'Battery current × battery voltage, both read from the sensors.',
  },
  {
    reading: 'Mac power use',
    kind: 'calculated',
    how: 'Adapter power minus battery power, so the diagram always balances.',
  },
  {
    reading: 'Graphics (GPU) power',
    kind: 'measured',
    how: 'From macOS’s energy counters, on Macs where that counter updates.',
  },
  {
    reading: 'Processor (CPU) power',
    kind: 'estimated',
    how: 'From processor activity, calibrated on an M1 Pro (about 1.2 W error there). Marked as not validated on other chips.',
  },
  {
    reading: 'Display power',
    kind: 'estimated',
    how: 'From screen brightness, backlight only. About 1 W error on the Mac it was measured on.',
  },
  {
    reading: 'Power per app',
    kind: 'estimated',
    how: 'From the energy macOS records for each app’s processor use. Covers roughly half of real power under load.',
  },
  {
    reading: 'Power at the wall',
    kind: 'estimated',
    how: 'From macOS’s own adapter-loss figure. Not checked against a plug-in meter.',
  },
  {
    reading: 'Time left if you unplug',
    kind: 'estimated',
    how: 'Remaining battery energy divided by your average power use over the last 60 seconds.',
  },
  {
    reading: 'Neural Engine, memory and total chip power',
    kind: 'unavailable',
    how: 'Needs administrator access, which MacPUMP never asks for. Shown as unavailable, never guessed.',
  },
];

export const faq: { q: string; a: string }[] = [
  {
    q: 'How do I see how much power my Mac is using?',
    a: 'Open MacPUMP from the menu bar, or press ⌥⌘P. The popover and the Power tab show your Mac’s power use in watts (W), updated about once a second.',
  },
  {
    q: 'Which app uses the most battery on my Mac?',
    a: 'The Apps tab and the app power list in the popover estimate how much power each app uses, right now and over the last 15 minutes up to 30 days. They are estimates based on each app’s processor activity, not exact measurements.',
  },
  {
    q: 'How long will my MacBook battery last?',
    a: 'MacPUMP shows an estimated runtime: how long the battery would last if you unplugged now, based on your average power use over the last minute or so.',
  },
  {
    q: 'What is the difference between watts (W) and watt-hours (Wh)?',
    a: 'Watts are how fast energy is being used right now. Watt-hours are the total energy used over time, like speed versus distance.',
  },
  {
    q: 'Is MacPUMP free?',
    a: 'Yes. MacPUMP is free to download and use, at home or at work. It is not open source: you may not sell it, redistribute it or modify it. The full licence is on GitHub.',
  },
  {
    q: 'Are the numbers exact?',
    a: 'Some are measured by sensors in your Mac, some are calculated from those, and some are estimates. Every number is labelled Measured, Calculated, Estimated or Unavailable so you can tell which.',
  },
  {
    q: 'Can MacPUMP limit or change how my Mac charges?',
    a: 'No. MacPUMP only reads. Its charge markers and reminders tell you when your charge crosses a level you choose; they never change how your Mac charges.',
  },
  {
    q: 'Is MacPUMP private?',
    a: 'Yes. Readings and history stay on your Mac, 7 days by default or 30 days if you choose. The app makes no network connections and collects no usage data.',
  },
  {
    q: 'Does it need an administrator password?',
    a: 'No. MacPUMP runs with your normal user rights and installs no helper, daemon or kernel extension. macOS asks once for permission to show notifications, the first time you turn on a reminder or alert.',
  },
  {
    q: 'Does it work on any Mac?',
    a: 'It is built for MacBooks with a battery and needs macOS 14 or later. The downloadable build is for Apple silicon. The processor and display estimates were tuned on an M1 Pro MacBook Pro and may be less accurate on other models.',
  },
  {
    q: 'Why does macOS warn me when I first open it?',
    a: 'This build is not notarized by Apple yet, so macOS cannot check it. Open System Settings › Privacy & Security and click Open Anyway. You only need to do this once.',
  },
  {
    q: 'I can’t see MacPUMP in my menu bar.',
    a: 'Your menu bar is probably full, so macOS has placed the icon behind the notch. Press ⌥⌘P to open the popover anyway, or free up some menu bar space. You can also show MacPUMP in the Dock.',
  },
];
