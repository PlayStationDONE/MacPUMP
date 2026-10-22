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
    'MacPUMP shows your MacBook’s live power use, battery time left and which apps use the most energy, in plain English. Your data stays on your Mac.',
  /** Shown in page titles after the page name. */
  titleSuffix: 'MacPUMP',
};

/**
 * The release offered on the Download section. Keep this in step with the GitHub release that has the app ZIP
 * attached, not with build.sh: a version without a downloadable build must not be advertised here.
 */
export const release = {
  version: '1.2.0',
  /** "pre-release" or "release". Pre-releases get a label next to the version. */
  channel: 'pre-release' as 'pre-release' | 'release',
  date: '2026-10-20',
  /**
   * A public HTTPS link to the ZIP, or null while there is no public download. Never put a link that needs a GitHub
   * login here (the application repository and its releases are private): visitors would get a 404.
   */
  downloadUrl: null as string | null,
  fileName: 'MacPUMP-1.2.0-macOS-arm64.zip',
  /** SHA-256 of the ZIP, published so people can check their download. Null to hide it. */
  sha256: '6c6fc49e8493cbd29841679c2dce17080c8c068da46ac59b4ec1f4bad8a74aeb' as string | null,
  architecture: 'Apple silicon (arm64)',
  /** Plain statement of how the build is signed. Do not say "notarized" until it is. */
  signing: {
    notarized: false,
    summary: 'Ad-hoc signed with the hardened runtime. Not signed with a Developer ID and not notarized yet.',
  },
};

export const requirements = {
  macOS: 'macOS 14 Sonoma or later',
  hardware: 'A Mac with Apple silicon. Built for MacBooks with a battery.',
  testedOn: 'Developed and tested on a 14-inch MacBook Pro with an M1 Pro.',
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
];

export const legal = {
  /** The licence names no copyright holder yet; update this once it does. */
  copyright: `© ${new Date().getFullYear()} MacPUMP. All rights reserved.`,
  thirdParty: {
    name: 'PowerFlow',
    author: 'Dylan',
    licence: 'MIT License',
    url: 'https://github.com/dylansantwani/powerflow',
  },
};
