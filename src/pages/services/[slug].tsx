import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'next-export-i18n';

type Plan = {
  name: string;
  description: string;
  button: string;
};

type WorkshopCategory = {
  title: string;
  plans: Plan[];
};

type ServiceData = {
  title: string;
  icon: string;
  description: string;
  workshopCategories?: WorkshopCategory[];
};

const workshopData: WorkshopCategory[] = [
  {
    title: '冥想',
    plans: [
      {
        name: '1-2人(預期時間：1天)',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        button: '點我預約',
      },
      {
        name: '3-4人(預期時間：2天)',
        description:
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
        button: '點我預約',
      },
    ],
  },
  {
    title: '製作自己的專屬療癒燭',
    plans: [
      {
        name: '1-2人(預期時間：1天)',
        description:
          'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
        button: '點我預約',
      },
      {
        name: '3-4人(預期時間：2天)',
        description:
          'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
        button: '點我預約',
      },
    ],
  },
  {
    title: '探索自我診療室',
    plans: [
      {
        name: '1-2人(預期時間：1天)',
        description:
          'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
        button: '點我預約',
      },
      {
        name: '3-4人(預期時間：2天)',
        description:
          'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue.',
        button: '點我預約',
      },
    ],
  },
];

const services: Record<string, ServiceData> = {
  PurpleStarAstrology: {
    title: '紫微斗數',
    icon: '🔮',
    description:
      'Unlock your destiny with the ancient wisdom of Purple Star Astrology.',
  },
  IntegratedEnergyTherapy: {
    title: '大天使IET綜合能量療法',
    icon: '👼',
    description:
      'Heal your energy field with the gentle power of Integrated Energy Therapy.',
  },
  PetTelepathy: {
    title: '寵物溝通',
    icon: '🐕',
    description:
      'Connect deeply with your furry friends through telepathic communication.',
  },
  MagneticFieldCleansing: {
    title: '空間淨化',
    icon: '🌿',
    description:
      'Clear negative energy and restore harmony to your living space.',
  },
  CustomProductConsulting: {
    title: '客製商品諮詢',
    icon: 'ℹ️',
    description:
      'Create a unique product tailored specifically to your needs and desires.',
  },
  Workshop: {
    title: 'Workshop',
    icon: '🕯️',
    description:
      'Join our hands-on workshops to learn new skills and create beautiful items.',
    workshopCategories: workshopData,
  },
};

const ExpandableText = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();

  return (
    <div>
      <p
        className={`text-gray-600 text-sm leading-relaxed ${
          !isExpanded ? 'line-clamp-3' : ''
        }`}
      >
        {text}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-500 text-sm mt-1 hover:underline focus:outline-none"
      >
        {isExpanded ? t('common.showLess') : t('common.readMore')}
      </button>
    </div>
  );
};

export default function ServiceDetail({ service }: { service: ServiceData }) {
  const router = useRouter();
  const { t } = useTranslation();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!service) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold">Service Not Found</h1>
          <Link href="/service" className="text-blue-500 hover:underline mt-4">
            Back to Services
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto py-20 px-6">
        <Link
          href="/service"
          className="text-gray-500 hover:text-black mb-8 inline-block"
        >
          ← Back to Services
        </Link>
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
            <span className="text-5xl">{service.icon}</span>
          </div>
          <h1 className="text-4xl font-bold mb-6">{service.title}</h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mb-12">
            {service.description}
          </p>

          {/* Workshop Specific Content */}
          {service.workshopCategories && (
            <div className="w-full space-y-12 text-left">
              {service.workshopCategories.map((category, idx) => (
                <div key={idx} className="bg-gray-50 p-8 rounded-3xl">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4 border-gray-200">
                    {category.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.plans.map((plan, planIdx) => (
                      <div
                        key={planIdx}
                        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                      >
                        <h3 className="text-lg font-bold mb-3 text-gray-900">
                          {plan.name}
                        </h3>
                        <div className="flex-grow mb-4">
                          <ExpandableText text={plan.description} />
                        </div>
                        <button className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium mt-auto">
                          {t('common.bookNow')}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!service.workshopCategories && (
            <p className="mt-8 text-gray-400 italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(services).map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const service = services[slug as keyof typeof services];

  if (!service) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      service,
    },
  };
};
