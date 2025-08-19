#!/usr/bin/env node

/**
 * Test script for Homepage Content Management API
 * Run this after starting your NestJS server
 */

const BASE_URL = 'http://localhost:3000/content/home';

// Test data examples
const testSections = {
  hero: {
    title: 'Test Hero Title',
    subtitle: 'Test Subtitle',
    description: 'This is a test description for the hero section',
    backgroundImage: '/images/test-hero.jpg',
    cta: [
      { text: 'Test Button 1', target: '/test1', variant: 'primary' },
      { text: 'Test Button 2', target: '/test2', variant: 'secondary' }
    ]
  },
  about: {
    title: 'Test About Section',
    description: 'This is a test about section',
    image: '/images/test-about.jpg',
    subtitles: ['Test Subtitle 1', 'Test Subtitle 2', 'Test Subtitle 3'],
    paragraphs: [
      { title: 'Test Mission', content: 'This is a test mission statement.' },
      { title: 'Test Vision', content: 'This is a test vision statement.' }
    ]
  },
  custom: {
    title: 'Custom Test Section',
    description: 'This is a completely custom section',
    items: [
      { name: 'Item 1', value: 'Value 1', active: true },
      { name: 'Item 2', value: 'Value 2', active: false },
      { name: 'Item 3', value: 'Value 3', active: true }
    ],
    metadata: {
      created: new Date().toISOString(),
      version: '1.0.0',
      tags: ['test', 'custom', 'example']
    }
  }
};

// Helper function to make HTTP requests
async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    const data = await response.json();
    
    console.log(`\n${options.method || 'GET'} ${url}`);
    console.log(`Status: ${response.status}`);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    return { response, data };
  } catch (error) {
    console.error(`\nError making request to ${url}:`, error.message);
    return { error };
  }
}

// Test functions
async function testGetAllSections() {
  console.log('\n=== Testing GET /content/home (All Sections) ===');
  await makeRequest(BASE_URL);
}

async function testGetSpecificSection(sectionKey) {
  console.log(`\n=== Testing GET /content/home/${sectionKey} ===`);
  await makeRequest(`${BASE_URL}/${sectionKey}`);
}

async function testUpdateSection(sectionKey, data) {
  console.log(`\n=== Testing PATCH /content/home/${sectionKey} ===`);
  await makeRequest(`${BASE_URL}/${sectionKey}`, {
    method: 'PATCH',
    body: JSON.stringify({ data })
  });
}

async function testUpdateSectionFields(sectionKey, fields) {
  console.log(`\n=== Testing PATCH /content/home/${sectionKey}/fields ===`);
  await makeRequest(`${BASE_URL}/${sectionKey}/fields`, {
    method: 'PATCH',
    body: JSON.stringify({ fields })
  });
}

async function testToggleSection(sectionKey) {
  console.log(`\n=== Testing PATCH /content/home/${sectionKey}/toggle ===`);
  await makeRequest(`${BASE_URL}/${sectionKey}/toggle`, {
    method: 'PATCH',
    headers: {
      'Authorization': 'Bearer YOUR_JWT_TOKEN_HERE'
    }
  });
}

async function testDeleteSection(sectionKey) {
  console.log(`\n=== Testing DELETE /content/home/${sectionKey} ===`);
  await makeRequest(`${BASE_URL}/${sectionKey}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer YOUR_JWT_TOKEN_HERE'
    }
  });
}

// Main test execution
async function runTests() {
  console.log('🚀 Starting Homepage Content Management API Tests');
  console.log('================================================');
  
  // Test 1: Get all sections (should return empty or default sections)
  await testGetAllSections();
  
  // Test 2: Get specific sections (should create defaults if they don't exist)
  await testGetSpecificSection('hero');
  await testGetSpecificSection('about');
  await testGetSpecificSection('features');
  
  // Test 3: Update sections completely
  await testUpdateSection('hero', testSections.hero);
  await testUpdateSection('about', testSections.about);
  
  // Test 4: Create a custom section
  await testUpdateSection('custom', testSections.custom);
  
  // Test 5: Update specific fields
  await testUpdateSectionFields('hero', {
    title: 'Updated Hero Title',
    subtitle: 'Updated Subtitle'
  });
  
  // Test 6: Get all sections again (should now have our test data)
  await testGetAllSections();
  
  // Test 7: Get specific updated sections
  await testGetSpecificSection('hero');
  await testGetSpecificSection('custom');
  
  console.log('\n✅ All tests completed!');
  console.log('\nNote: Authentication-required tests (toggle, delete) were skipped.');
  console.log('To test those endpoints, update the JWT token in the test functions.');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testGetAllSections,
  testGetSpecificSection,
  testUpdateSection,
  testUpdateSectionFields,
  testToggleSection,
  testDeleteSection
};
