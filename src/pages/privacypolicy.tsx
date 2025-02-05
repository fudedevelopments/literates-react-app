import { FaUserShield, FaLock, FaCookieBite, FaInfoCircle } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50">
         

            {/* Hero Section */}
            <div className="relative bg-blue-600 h-64 flex items-center">
                <div className="absolute inset-0 bg-opacity-50 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b')]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
                    <p className="text-xl text-white">Last Updated: February 4, 2025</p>
                </div>
            </div>

            {/* Main Content */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose lg:prose-xl max-w-none">
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold mb-4 flex items-center">
                                <FaUserShield className="text-blue-600 mr-2" />
                                Your Privacy Matters
                            </h2>
                            <p className="text-gray-600">
                                At Literates, we are committed to protecting your personal information and being transparent
                                about what we do with it. This policy explains how we collect, use, and protect your data.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <FaLock className="text-blue-600 mr-2" />
                                Information We Collect
                            </h3>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                <li>Personal identification information (Name, email address, phone number)</li>
                                <li>Shipping and billing addresses</li>
                                <li>Payment information (processed through secure third-party processors)</li>
                                <li>Order history and preferences</li>
                                <li>Technical data (IP address, browser type, device information)</li>
                            </ul>
                        </div>

                        <div className="mb-12">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <MdSecurity className="text-blue-600 mr-2" />
                                How We Use Your Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h4 className="font-semibold mb-2">Order Processing</h4>
                                    <p className="text-gray-600">
                                        To process transactions, arrange shipping, and provide order updates
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h4 className="font-semibold mb-2">Customer Service</h4>
                                    <p className="text-gray-600">
                                        To respond to inquiries and provide personalized support
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h4 className="font-semibold mb-2">Improvements</h4>
                                    <p className="text-gray-600">
                                        To analyze website usage and enhance user experience
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h4 className="font-semibold mb-2">Marketing</h4>
                                    <p className="text-gray-600">
                                        To send promotional offers (only with your consent)
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-12">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <FaCookieBite className="text-blue-600 mr-2" />
                                Cookies & Tracking
                            </h3>
                            <p className="text-gray-600 mb-4">
                                We use cookies to:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                <li>Remember user preferences</li>
                                <li>Analyze website traffic</li>
                                <li>Enable shopping cart functionality</li>
                                <li>Improve site performance</li>
                            </ul>
                            <p className="text-gray-600 mt-4">
                                You can manage cookie preferences through your browser settings.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <FaInfoCircle className="text-blue-600 mr-2" />
                                Your Rights
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h4 className="font-semibold mb-2">Access & Correction</h4>
                                    <p className="text-gray-600">
                                        Request access to or correction of your personal data
                                    </p>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h4 className="font-semibold mb-2">Data Deletion</h4>
                                    <p className="text-gray-600">
                                        Request deletion of your personal information
                                    </p>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h4 className="font-semibold mb-2">Opt-Out</h4>
                                    <p className="text-gray-600">
                                        Unsubscribe from marketing communications at any time
                                    </p>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h4 className="font-semibold mb-2">Complaints</h4>
                                    <p className="text-gray-600">
                                        Lodge complaints with data protection authorities
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-12">
                            <h3 className="text-xl font-semibold mb-4">Security Measures</h3>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                    <li>SSL/TLS encryption for all data transmissions</li>
                                    <li>PCI-DSS compliant payment processing</li>
                                    <li>Regular security audits</li>
                                    <li>Limited employee access to sensitive data</li>
                                    <li>Two-factor authentication for administrative accounts</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-8 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                            <p className="text-gray-600">
                                For privacy-related inquiries or requests:<br />
                                Email:  literatesartemporium@gmail.com<br />
                                Phone: 9944050658<br />
                                Literates Art Emporium,
                                RS Road,
                                Vijayamangalam,
                                Erode. - 638056
                                Tamilnadu. 
                            </p>
                            <p className="text-gray-600 mt-4">
                                We aim to respond to all requests within 7 business days.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default PrivacyPolicy;