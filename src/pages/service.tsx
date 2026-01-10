import Layout from '@/components/Layout';

export default function Service() {
    return (
        <Layout>
            {/* Hero Section */}
            <div className="relative w-full bg-gray-900 py-32 px-6 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('/images/1600x900.svg')] bg-cover bg-center" />
                <div className="relative z-10 max-w-4xl opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
                    <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
                        Premium Candle Services
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                        Experience the art of candle making with our exclusive workshops and
                        bespoke event services. Crafted for moments that matter.
                    </p>
                    <button className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors transform hover:scale-105 duration-200 shadow-lg">
                        Book a Consulation
                    </button>
                </div>
            </div>

            {/* Services Grid */}
            <div className="w-full max-w-7xl mx-auto py-20 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Card 1 */}
                    <div className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <span className="text-3xl">✨</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">
                            Workshops
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Join our hands-on workshops and learn the secrets of mixing
                            scents and pouring the perfect soy wax candle.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <span className="text-3xl">🎁</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">
                            Custom Gifts
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Personalized candles for weddings, corporate gifts, and special
                            occasions. Your scent, your label, your story.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <span className="text-3xl">🕯️</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">
                            Private Events
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Host an unforgettable candle-making party. We bring the
                            materials, the expertise, and the fun to you.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
