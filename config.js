'use strict';
/* Moon Reflection — Soul Blueprint Astrology · settings you may edit */

/* =====================================================================
   1. APP CONFIGURATION
   ===================================================================== */
const CONFIG = {
  APP_NAME: 'Moon Reflection',
  VERSION: '1.2.0',

  /* ------------------------------------------------------------------
     SBA WEBSITE URL — the ONE place to configure the future website.
     Leave as an empty string until the real site is live.
     While empty, every "Enter the SBA World" button shows "Coming Soon"
     and no link is opened. Example when live: 'https://example.com'
     ------------------------------------------------------------------ */
  SBA_WEBSITE_URL: '',
  /* Contact link for the menu (mailto: or https:). Empty = Coming soon. */
  CONTACT_URL: '',

  CURRENT_EVENT_WINDOW_DAYS: 3.5,
  AUTOSAVE_DELAY_MS: 700,
  DELTA_T_SECONDS: 70,
  LOCALE: 'en-GB',
  ASTRONOMY_ENABLED: true
};

/* Artwork. Extracted from the reference designs; replace the files in
   assets/images/ with the original full-resolution artwork when available. */
const ASSETS = { moon: 'assets/images/moon.webp' };

/* Stable, versioned storage keys. NEVER rename these in a future version. */
const STORAGE_KEYS = {
  journal: 'sba.moonReflection.journal.v1',
  settings: 'sba.moonReflection.settings.v1',
  preImportBackup: 'sba.moonReflection.journal.v1.preImportBackup',
  unreadablePrefix: 'sba.moonReflection.journal.v1.unreadable.'
};
const JOURNAL_SCHEMA = 1;
const BACKUP_FORMAT = 'sba-moon-reflection-backup';
