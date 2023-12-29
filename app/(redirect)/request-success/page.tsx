import ThankYouForm from '@lib/components/PageForms/ThankYouForm';

interface IPageProps {
  searchParams: {
    platform: string;
  };
}

export default async function RequestSuccessPage({ searchParams }: IPageProps) {
  const contactType = Number(searchParams.platform);
  return <ThankYouForm contactType={contactType} />;
}
