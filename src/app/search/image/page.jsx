import ImageSearchResults from '@/components/ImageSearchResults';
import Link from 'next/link';

const ImageSearch = async ({ searchParams }) => {
  const startIndex = searchParams.start || '1';
  //await new Promise((resolve) => setTimeout(resolve, 10000));
  const res = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${searchParams.searchTerm}&searchType=image&start=${startIndex}`
  );
  if (!res.ok) {
    throw new Error('Something went wrong');
  }
  const data = await res.json();
  const results = data.items;

  if (!results) {
    return (
      <div className='flex flex-col justify-center items-center pt-10'>
        <h1 className='text-3xl mb-4'> No results found</h1>
        <p className='text-lg'>
          Try searching something else or go back to home page{' '}
          <Link href='/' className='text-yellow-300'>
            Home
          </Link>
        </p>
      </div>
    );
  }
  return <>{results && <ImageSearchResults results={data} />}</>;
};
export default ImageSearch;
