// Test script for gallery API
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Configuration
const API_URL = 'http://localhost:4000/archives/gallery';
const TOKEN = 'YOUR_JWT_TOKEN'; // Replace with a valid JWT token
const IMAGE_PATH = path.join(__dirname, 'test-image.jpg'); // Replace with path to a test image

async function testGalleryAPI() {
    try {
        console.log('Testing Gallery API POST endpoint...');

        // Create form data
        const form = new FormData();
        form.append('event', 'Test Gallery Event');
        form.append('year', '2025');
        form.append('description', 'This is a test gallery item');
        form.append('tabId', '60d21b4667d0d8992e610c85'); // Replace with a valid tab ID from your database
        form.append('active', 'true');
        form.append('file', fs.createReadStream(IMAGE_PATH));

        // Make the request
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                // FormData will set the correct content-type with boundary
            },
            body: form
        });

        // Get the response
        const data = await response.json();

        // Log the result
        console.log(`Status: ${response.status} ${response.statusText}`);

        // If there's an error, log it in a more readable format
        if (!response.ok && data.message) {
            console.log('Validation errors:');
            if (Array.isArray(data.message)) {
                data.message.forEach((msg, i) => console.log(`  ${i + 1}. ${msg}`));
            } else {
                console.log(`  - ${data.message}`);
            }
        } else {
            console.log('Response:', JSON.stringify(data, null, 2));
        }

        if (response.ok) {
            console.log('✅ Test passed!');
        } else {
            console.log('❌ Test failed!');
        }
    } catch (error) {
        console.error('Error testing API:', error);
    }
}

testGalleryAPI();

/*
To run this test:
1. Install dependencies: npm install node-fetch@2 form-data
2. Replace YOUR_JWT_TOKEN with a valid token
3. Replace the tabId with a valid tab ID from your database
4. Replace test-image.jpg path with a valid image path
5. Run: node test-gallery-api.js
*/
