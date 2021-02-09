import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { BASE_URL, createURL } from "../src/utils";
import vybory, { TVybor } from "../src/crawler/vybory";

const url = createURL(BASE_URL);

const IndexPage = ({ items }: { items: TVybor[] }) => (
  <Layout title="Výbory - seznam">
    <h1>Výbory</h1>
    <a href={url}>Source</a>
    <hr />
    <ul>
      {items.map((i) => (
        <li key={i.href}>
          <a href={`/vybor/${encodeURIComponent(i.href)}`}>{i.title}</a>
        </li>
      ))}
    </ul>
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: { items: await vybory(url) },
  };
};

export default IndexPage;
