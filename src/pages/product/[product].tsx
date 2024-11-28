import { ProductType } from "@/types/product.type";
import DetailProduct from "@/views/DetailProduct";
const DetailProductPage = ({ product }: { product: ProductType }) => {
  // const { query } = useRouter();
  // console.log("query", query.product);
  // client-side
  // const { data, error, isLoading } = useSWR(
  //   `/api/product/${query.product}`,
  //   fetcher
  // );

  return (
    <div>
      {/* client-side */}
      {/* <DetailProduct product={isLoading ? {} : data.data} /> */}
      {/* Server-Side & Static-Side */}
      <DetailProduct product={product} />
    </div>
  );
};

export default DetailProductPage;

// export async function getServerSideProps({ params }) {
//   console.log(params.product);
//   // fetch data
//   const res = await fetch(
//     `http://localhost:3000/api/product/${params.product}`
//   );
//   const response = await res.json();

//   return {
//     props: {
//       product: response.data,
//     },
//   };
// }

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/product");
  const response = await res.json();

  const paths = response.data.map((product: ProductType) => ({
    params: {
      product: product.id,
    },
  }));

  // console.log(paths);

  return { paths, fallback: false };
}

export async function getStaticProps({
  params,
}: {
  params: { product: string };
}) {
  const res = await fetch(
    `http://localhost:3000/api/product/${params.product}`
  );
  const response = await res.json();

  return {
    props: {
      product: response.data,
    },
    revalidate: 10,
  };
}
