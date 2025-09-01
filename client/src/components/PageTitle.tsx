
interface PageTitleProps {
  title: string;
  subtitle: string;
  titleHref?: string;
}

export default function PageTitle({ title, subtitle, titleHref }: PageTitleProps) {
  return (
    <div>
      {titleHref ? (
        <h1 className='text-2xl hover:underline font-bold pb-2'>
          <a href={titleHref} style={{ textDecoration: 'none', color: 'inherit' }}>
            {title}
          </a>
        </h1>
      ) : (
        <h1 className='text-2xl font-bold pb-2'>{title}</h1>
      )}
      <p>{subtitle}</p>
    </div>
  );
}