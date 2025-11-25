// Test script to verify MDX reading
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const reviewsDirectory = path.join(process.cwd(), 'src/content/reviews');
const testFile = path.join(reviewsDirectory, 'melhor-notebook-2025.mdx');

console.log('Reviews directory:', reviewsDirectory);
console.log('Test file path:', testFile);
console.log('File exists:', fs.existsSync(testFile));

if (fs.existsSync(testFile)) {
    const fileContents = fs.readFileSync(testFile, 'utf8');
    console.log('\nFile size:', fileContents.length, 'bytes');

    try {
        const { data, content } = matter(fileContents);
        console.log('\nFrontmatter parsed successfully!');
        console.log('Title:', data.title);
        console.log('Slug:', data.slug);
        console.log('Category:', data.category);
        console.log('Content length:', content.length);
    } catch (error) {
        console.error('\nError parsing frontmatter:', error.message);
    }
}

// List all MDX files
console.log('\n--- All MDX files in reviews directory ---');
if (fs.existsSync(reviewsDirectory)) {
    const files = fs.readdirSync(reviewsDirectory);
    console.log('Files found:', files);
} else {
    console.log('Reviews directory does not exist!');
}
