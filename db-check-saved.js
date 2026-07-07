const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
    console.error('Error: .env.local not found!');
    process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
        env[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
});

const uri = env.MONGODB_URI;
if (!uri) {
    console.error('Error: MONGODB_URI not found!');
    process.exit(1);
}

// Define Schema matching the database
const EventSchema = new mongoose.Schema({
    title: String,
    slug: String,
    organizer: String,
    createdAt: Date
});

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

async function check() {
    try {
        console.log('Connecting to database to check contents...');
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log('Successfully connected to MongoDB Atlas!');
        
        const events = await Event.find().sort({ createdAt: -1 }).lean();
        console.log(`\nFound ${events.length} events in your LIVE database:`);
        events.forEach((e, idx) => {
            console.log(`${idx + 1}. Title: "${e.title}" | Slug: "${e.slug}" | Created: ${e.createdAt}`);
        });
        
        await mongoose.disconnect();
    } catch (err) {
        console.error('Failed to query database:', err);
    }
}

check();
