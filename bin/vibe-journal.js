#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const JOURNAL_FILE = 'VIBEJOURNAL.md';

function getTimestamp() {
    return new Date().toISOString().replace('T', ' ').split('.')[0];
}

const initTemplate = `# VibeJournal 🌀
*A topological documentation layer for vibe-coded projects.*

---
`;

const command = process.argv[2];

if (command === 'init') {
    if (fs.existsSync(JOURNAL_FILE)) {
        console.log('VibeJournal already exists in this directory. ✨');
    } else {
        fs.writeFileSync(JOURNAL_FILE, initTemplate);
        console.log('VibeJournal initialized! 🌀 Created VIBEJOURNAL.md');
    }
} else if (command === 'log') {
    const args = process.argv.slice(3);
    const intent = args[0] || 'No intent provided';
    const loc = args[1] || 'Unknown';
    const impl = args[2] || 'No implementation details';
    const trigger = args[3] || 'Manual trigger';
    const classification = args[4] || 'Experiment';

    const entry = `\n[${getTimestamp()}] [${classification}] Goal: [${intent}] | Location: [${loc}] | Implementation: [${impl}] | Trigger: "${trigger}"\n`;
    
    if (!fs.existsSync(JOURNAL_FILE)) {
        fs.writeFileSync(JOURNAL_FILE, initTemplate);
    }
    
    fs.appendFileSync(JOURNAL_FILE, entry);
    console.log('Logged entry to VibeJournal! 📄');
} else if (command === 'sync') {
    if (!fs.existsSync(JOURNAL_FILE)) {
        console.log('No VibeJournal found to sync. ⚠️');
        process.exit(1);
    }
    const content = fs.readFileSync(JOURNAL_FILE, 'utf8');
    const entries = content.split('\n').filter(line => line.startsWith('[')).slice(-5);
    console.log('--- SESSION SNAPSHOT ---');
    console.log(entries.join('\n'));
    console.log('--- END SNAPSHOT ---');
} else {
    console.log('Usage: vibe-journal <init|log|sync>');
}