function Hero() {
  return (
    <section className="h-screen bg-cover bg-center relative" style={{
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
    }}>
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Transform Your Body, Elevate Your Mind.
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Join the best fitness community and achieve your goals with expert trainers 
            and state-of-the-art facilities.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-outline">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;