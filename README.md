# Bridgette's Art Portfolio Website

A dynamic art portfolio website that automatically generates gallery pages based on S3 bucket folder structure. Built with React and designed for GitHub Pages deployment.

## Features

- **Dynamic Gallery System**: Automatically creates gallery pages based on S3 bucket folders
- **Responsive Design**: Optimized for all device sizes
- **Image Optimization**: Lazy loading and loading states for large images
- **Contact Form**: Email integration using EmailJS
- **GitHub Pages Ready**: Configured for easy deployment

## Setup Instructions

### 1. Environment Configuration

Copy the `.env.example` file to `.env` and fill in your configuration:

```bash
cp .env.example .env
```

Update the following variables in `.env`:

#### AWS S3 Configuration
- `REACT_APP_AWS_REGION`: Your S3 bucket region (e.g., us-east-1)
- `REACT_APP_AWS_ACCESS_KEY_ID`: Your AWS access key ID
- `REACT_APP_AWS_SECRET_ACCESS_KEY`: Your AWS secret access key
- `REACT_APP_S3_BUCKET_NAME`: Your S3 bucket name

#### EmailJS Configuration (for contact form)
- `REACT_APP_EMAILJS_SERVICE_ID`: Your EmailJS service ID
- `REACT_APP_EMAILJS_TEMPLATE_ID`: Your EmailJS template ID
- `REACT_APP_EMAILJS_USER_ID`: Your EmailJS user ID
- `REACT_APP_ARTIST_EMAIL`: The artist's email address

### 2. S3 Bucket Setup

#### Bucket Structure
Organize your S3 bucket with the following structure:
```
your-bucket-name/
├── portraits/
│   ├── image1.jpg
│   ├── image2.png
│   └── image3.jpg
├── landscapes/
│   ├── image1.jpg
│   └── image2.jpg
└── abstract/
    ├── image1.jpg
    └── image2.jpg
```

Each folder will automatically become a gallery page on your website.

#### Bucket Permissions
1. Enable public read access for objects
2. Configure CORS to allow access from your domain:

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": []
    }
]
```

### 3. EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a new email service
3. Create an email template with the following variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`
   - `{{to_email}}`
4. Get your service ID, template ID, and user ID for the environment variables

### 4. Development

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm start
```

### 5. GitHub Pages Deployment

1. Update the `homepage` field in `package.json` with your GitHub Pages URL
2. Build and deploy:
```bash
npm run deploy
```

This will automatically build the project and push it to the `gh-pages` branch.

## Project Structure

```
src/
├── components/
│   ├── Home.js          # Homepage with gallery overview
│   ├── About.js         # About the artist page
│   ├── Contact.js       # Contact form
│   ├── Gallery.js       # Individual gallery page
│   └── ImageModal.js    # Image lightbox modal
├── services/
│   └── s3Service.js     # S3 integration functions
└── App.js               # Main app with routing
```

## Customization

### Styling
All components have corresponding CSS files that can be customized to match your design preferences.

### About Page
Edit `src/components/About.js` to customize the artist's biography and information.

### Contact Information
Update the contact page content in `src/components/Contact.js`.

## Image Requirements

- Supported formats: JPG, JPEG, PNG, GIF, WebP
- Recommended size: 1200-2000px on the longest side for optimal quality
- The system automatically generates titles from filenames (removes extensions and formats text)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.
