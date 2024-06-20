import { useRouter } from 'next/navigation'
import { LIMIT_PAGINATOR } from '../../hooks/Constants';

const PaginationControls = ({ totalCount, searchParams, hasNextPage, hasPrevPage, baseUrlRedirect }) => {
  const router = useRouter();

  let page = searchParams['page'] || '1';
  const total = Math.ceil(totalCount / parseInt(LIMIT_PAGINATOR)) == 0 ? '1' : Math.ceil(totalCount / parseInt(LIMIT_PAGINATOR))
  if (page > total) {
    router.push(`/prueba?inicio=${searchParams['inicio']}&fin=${searchParams['fin']}&page=${total}`);
  }

  return (
    <div className='flex gap-2'>
      <button
        className='bg-blue-500 text-white p-1'
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/pronosticos?inicio=${searchParams['inicio']}&fin=${searchParams['fin']}&page=${Number(page) - 1}`);
        }}>
        Anterior
      </button>

      <div>
        {/* {page} / {Math.ceil(totalCount / parseInt(LIMIT_PAGINATOR)) == 0 || Math.ceil(totalCount / parseInt(LIMIT_PAGINATOR)).toString() == 'NaN'  ? 1 : Math.ceil(totalCount / parseInt(LIMIT_PAGINATOR))} */}
        {page} / {total}
      </div>

      <button
        className='bg-blue-500 text-white p-1'
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/${baseUrlRedirect}?inicio=${searchParams['inicio']}&fin=${searchParams['fin']}&page=${Number(page) + 1}`);
        }}>
        Siguiente
      </button>
    </div>
  );
};

export default PaginationControls;
