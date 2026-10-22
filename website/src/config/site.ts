/**
 * Everything that changes from release to release lives here. See MAINTENANCE.md before editing.
 *
 * Only state what the app actually does. Every claim on the site was checked against the app's source, README and
 * docs/FEATURE_VERIFICATION.md in the application repository.
 */

export const app = {
  name: 'MacPUMP',
  longName: 'Mac Power Usage Monitoring Program',
  tagline: 'See where your Mac’s power goes.',
  description:
    'MacPUMP shows your MacBook’s live power use, battery time left and which apps use the most energy, in plain English. Free, private, and your data stays on your Mac.',
  /** Shown in page titles after the page name. */
  titleSuffix: 'MacPUMP',
};

/** The public GitHub repository: releases, issues and the licence text. */
export const repo = {
  url: 'https://github.com/PlayStationDONE/MacPUMP',
  releases: 'https://github.com/PlayStationDONE/MacPUMP/releases/latest',
  issues: 'https://github.com/PlayStationDONE/MacPUMP/issues',
  licence: 'https://github.com/PlayStationDONE/MacPUMP/blob/main/LICENSE.md',
};

/**
 * The release offered on the Download section. Keep this in step with the GitHub release that has the app attached.
 * Take the file names and SHA-256 values from the release notes (or the asset "digest" on the release page).
 */
export const release = {
  version: '1.2.1',
  /** "pre-release" or "release". Pre-releases get a label next to the version. */
  channel: 'release' as 'pre-release' | 'release',
  date: '2026-10-21',
  /**
   * A public HTTPS link to the main download, or null while there is none. The repository and its releases are
   * public, so a GitHub release asset works. Never use a link that needs a login.
   */
  downloadUrl: 'https://github.com/PlayStationDONE/MacPUMP/releases/download/v1.2.1/MacPUMP-1.2.1.dmg' as string | null,
  fileName: 'MacPUMP-1.2.1.dmg',
  /** SHA-256 of the main download, published so people can check it. Null to hide it. */
  sha256: '5a40327034f8afa38310ace109f34a498a0e1c6f0be622b4bf7c17a1b470828e' as string | null,
  /** The same app as a ZIP, for people who prefer one. Null to hide it. */
  alternate: {
    url: 'https://github.com/PlayStationDONE/MacPUMP/releases/download/v1.2.1/MacPUMP-1.2.1.zip',
    fileName: 'MacPUMP-1.2.1.zip',
    sha256: '8fe3b526a66b34392c4aaba241d107a5276cca1dde009bc5f9481d609e8db7f3',
  } as { url: string; fileName: string; sha256: string } | null,
  architecture: 'Apple silicon (arm64)',
  /** Plain statement of how the build is signed. Do not say "notarized" until it is. */
  signing: {
    notarized: false,
    summary: 'Ad-hoc signed with the hardened runtime. Not signed with a Developer ID and not notarized yet.',
  },
};

export const requirements = {
  macOS: 'macOS 14 Sonoma or later',
  hardware: 'A Mac with Apple silicon (M1 or newer). Built for MacBooks with a battery.',
  testedOn: 'Developed and properly tested on a MacBook Pro with an M1 Pro.',
};

export const nav = [
  { label: 'Features', href: '/#features' },
  { label: 'Power', href: '/#power' },
  { label: 'History', href: '/#history' },
  { label: 'Docs', href: '/docs' },
  { label: 'Changelog', href: '/changelog' },
];

export const footerLinks = [
  { label: 'Download', href: '/#download' },
  { label: 'Documentation', href: '/docs' },
  { label: 'Changelog', href: '/changelog' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Licence', href: '/licence' },
  { label: 'GitHub', href: repo.url },
  { label: 'Report a bug', href: repo.issues },
];

export const legal = {
  /** Matches LICENSE.md in the public repository. */
  copyright: `© ${new Date().getFullYear()} the MacPUMP developer (PlayStationDONE). All rights reserved.`,
  summary: 'MacPUMP is free to download and use. It is not open source.',
  thirdParty: {
    name: 'PowerFlow',
    author: 'Dylan',
    licence: 'MIT License',
    url: 'https://github.com/dylansantwani/powerflow',
  },
};
