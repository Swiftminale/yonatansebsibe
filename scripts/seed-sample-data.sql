-- Insert sample portfolio items
INSERT INTO portfolio_items (title, category, client, description, tags, image, featured, year) VALUES
('Modern Tech Startup Branding', 'Branding', 'TechFlow Inc.', 'Complete brand identity including logo, color palette, and brand guidelines.', '["Logo Design", "Brand Identity", "Style Guide"]', '/placeholder.svg?height=400&width=600&text=Tech+Startup+Branding', true, '2024'),
('E-commerce Website Design', 'Web Design', 'Fashion Forward', 'Responsive e-commerce platform with modern UI/UX design.', '["UI/UX", "Responsive", "E-commerce"]', '/placeholder.svg?height=400&width=600&text=E-commerce+Website', true, '2024'),
('Social Media Campaign', 'Content', 'Lifestyle Brand', 'Engaging social media content for Instagram and Facebook campaigns.', '["Social Media", "Content Creation", "Photography"]', '/placeholder.svg?height=400&width=600&text=Social+Media+Campaign', true, '2024'),
('Restaurant Menu Design', 'Print', 'Bella Vista Restaurant', 'Elegant menu design with custom illustrations and typography.', '["Print Design", "Typography", "Illustration"]', '/placeholder.svg?height=400&width=600&text=Restaurant+Menu', false, '2023'),
('Corporate Photography', 'Photography', 'Business Solutions Ltd.', 'Professional headshots and office environment photography.', '["Portrait", "Corporate", "Professional"]', '/placeholder.svg?height=400&width=600&text=Corporate+Photography', false, '2024');

-- Insert sample services
INSERT INTO services (title, description, features, pricing, timeline, active) VALUES
('Graphic Design', 'Logo design, branding, print materials, and digital graphics that make your brand stand out.', '["Logo Design", "Brand Identity", "Print Design", "Digital Graphics"]', 'Starting at $2,500', '2-3 weeks', true),
('Content Creation', 'Engaging visual content for social media, websites, and marketing campaigns.', '["Social Media Content", "Photography", "Video Content", "Marketing Materials"]', 'Starting at $1,500', '1-2 weeks', true),
('Web Design', 'Modern, responsive websites that convert visitors into customers.', '["Responsive Design", "UI/UX", "E-commerce", "CMS Integration"]', 'Starting at $4,000', '4-6 weeks', true);

-- Insert sample testimonials
INSERT INTO testimonials (name, company, content, rating, featured) VALUES
('Sarah Johnson', 'TechFlow Inc.', 'Exceptional work! The branding perfectly captured our vision and exceeded our expectations.', 5, true),
('Mike Chen', 'Creative Agency', 'Professional, creative, and always delivers on time. The content creation quality is outstanding.', 5, true),
('Emily Davis', 'Local Business', 'Great communication throughout the project. The client portal made collaboration so easy.', 5, false);

-- Insert default site settings
INSERT INTO site_settings (siteName, tagline, heroDescription, contactEmail, contactPhone, location, businessHours) VALUES
('CreativeStudio', 'Bringing Your Vision to Life', 'Professional graphic design and content creation services with integrated client management. From concept to completion, we make your brand shine.', 'hello@creativestudio.com', '+1 (555) 123-4567', 'San Francisco, CA', 'Mon - Fri: 9AM - 6PM PST');
