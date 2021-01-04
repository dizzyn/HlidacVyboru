import Layout from "../components/Layout";
import { GetStaticProps } from "next";

interface TVybor {
  title: String;
  href: String;
}

const IndexPage = ({ items }: { items: TVybor[] }) => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Výbory</h1>
    <ul>
      {items.map((i) => (
        <li>{i.title}</li>
      ))}
    </ul>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`http://localhost:3000/api/vybory`);
  const data = await res.json();
  console.log("DATA", data);
  return {
    props: { items: data }, // will be passed to the page component as props
  };
};

export default IndexPage;
