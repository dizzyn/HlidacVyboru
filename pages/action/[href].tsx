import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import action, { TActionDetail } from "../../crawler/action";

const ActionPage = ({
  action: { title, date, number, documents, sourceHref },
}: {
  action: TActionDetail;
}) => (
  <Layout title={title}>
    <table>
      <tbody>
        <tr>
          <th>Action</th>
          <td>{title}</td>
        </tr>
        <tr>
          <th>Výbor</th>
          <td></td>
        </tr>
        <tr>
          <th>Date</th>
          <td>{date}</td>
        </tr>
        <tr>
          <th>Číslo jednání</th>
          <td>{number}</td>
        </tr>
        <tr>
          <th>Dokumenty</th>
          <td>{documents?.length}</td>
        </tr>
        <tr>
          <th>Zdroj</th>
          <td>
            <a href={sourceHref}>{sourceHref}</a>
          </td>
        </tr>
      </tbody>
    </table>
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log("HREF", decodeURIComponent(String(context.params?.href)))
  const uri = decodeURIComponent(String(context.params?.href));
  return {
    props: { action: await action(uri) },
  };
};

export default ActionPage;
