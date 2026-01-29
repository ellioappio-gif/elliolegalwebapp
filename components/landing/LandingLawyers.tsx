import Link from 'next/link'
import { ArrowRight, Briefcase, TrendingUp, Users, DollarSign, Clock, CheckCircle, Star } from 'lucide-react'

interface LandingLawyersProps {
  config: any
}

interface Benefit {
  title?: string
  text?: string
  [key: string]: any
}

export default function LandingLawyers({ config }: LandingLawyersProps) {
  const { content = {} } = config
  const { hero = {}, benefits = [] } = content

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-secondary via-white to-neutral-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-indigo-700 mb-6">
              {hero.title || 'Expand Your Legal Practice'}
            </h1>
            <p className="text-xl lg:text-2xl text-text-secondary max-w-4xl mx-auto mb-10">
              {hero.subtitle || 'Join our network of qualified attorneys and connect with clients who need your expertise.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={hero.ctaUrl || '/auth/signup?type=lawyer'}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-indigo-700 to-brand-indigo-600 hover:shadow-lg text-white rounded-lg font-semibold text-lg transition-all"
              >
                {hero.ctaText || 'Join Our Network'}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/pricing?type=lawyer"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-brand-indigo-600 text-brand-indigo-600 hover:bg-brand-indigo-600 hover:text-white rounded-lg font-semibold text-lg transition-all"
              >
                View Partnership Plans
              </Link>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-brand-indigo-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-sky-500/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Quicksand'] text-3xl lg:text-4xl font-bold text-brand-indigo-700 mb-4">
              Why Join ellio?
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Grow your practice with our platform designed specifically for legal professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: 'Pre-Qualified Clients',
                description: 'Connect with clients who have already been screened and are ready to work with an attorney'
              },
              {
                icon: TrendingUp,
                title: 'Grow Your Practice',
                description: 'Expand your client base and increase revenue through our referral network'
              },
              {
                icon: Clock,
                title: 'Save Time',
                description: 'AI-assisted case preparation and client screening saves you valuable time'
              },
              {
                icon: DollarSign,
                title: 'Increase Revenue',
                description: 'Access to high-value cases and clients with verified legal needs'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-surface-secondary rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-brand-indigo-600/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-brand-indigo-600" />
                </div>
                <h3 className="font-sans text-xl font-semibold text-text-primary mb-4">
                  {benefit.title}
                </h3>
                <p className="text-text-secondary">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features for Lawyers */}
      <section className="py-20 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Quicksand'] text-3xl lg:text-4xl font-bold text-brand-indigo-700 mb-4">
              Professional Tools & Support
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Everything you need to manage clients and grow your practice
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                {(benefits.length > 0 ? benefits : [
                  'Access to pre-qualified clients',
                  'AI-assisted case preparation',
                  'Streamlined client communication',
                  'Professional marketing support'
                ]).map((benefit: Benefit, index: number) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-semantic-success rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-text-primary text-lg">
                      {typeof benefit === 'string' ? benefit : benefit.text || benefit.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <Briefcase className="w-12 h-12 text-brand-indigo-600 mx-auto mb-4" />
                <h3 className="font-['Quicksand'] text-2xl font-bold text-text-primary mb-2">
                  Join 500+ Attorneys
                </h3>
                <p className="text-text-secondary">
                  Already growing their practice with ellio
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Average Monthly Referrals</span>
                  <span className="font-semibold text-text-primary">12-25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Client Satisfaction</span>
                  <span className="font-semibold text-text-primary">4.8/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Average Case Value</span>
                  <span className="font-semibold text-text-primary">$2,500+</span>
                </div>
              </div>

              <Link
                href="/auth/signup?type=lawyer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-indigo-700 to-brand-indigo-600 hover:shadow-lg text-white rounded-lg font-semibold transition-all"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-surface-secondary rounded-2xl p-8 lg:p-12">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl lg:text-2xl text-text-primary font-medium mb-6">
              "ellio has transformed how I connect with new clients. The quality of referrals is exceptional, and the AI assistance helps me prepare more efficiently."
            </blockquote>
            <div className="text-text-secondary">
              <div className="font-semibold text-text-primary">Sarah Johnson, Esq.</div>
              <div>Family Law Attorney, San Francisco</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-brand-indigo-700 to-brand-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Quicksand'] text-3xl lg:text-4xl font-bold mb-4">
            Ready to Expand Your Practice?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Join our network of attorneys and start receiving qualified client referrals today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup?type=lawyer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-indigo-600 hover:bg-neutral-50 rounded-lg font-semibold text-lg transition-all"
            >
              Start Your Application
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact?subject=lawyer-inquiry"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-brand-indigo-600 rounded-lg font-semibold text-lg transition-all"
            >
              Speak with Our Team
            </Link>
          </div>
          <p className="text-sm opacity-75 mt-4">
            Application review typically takes 2-3 business days
          </p>
        </div>
      </section>
    </div>
  )
}