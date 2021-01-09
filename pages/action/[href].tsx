import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import action, { TActionDetail } from "../../crawler/action";
import { TDocument } from "../../crawler/documents";

const Documents = ({
  documents
}: {
  documents: TDocument[];
}) => documents.map(({ title, type, href, sourceHref }) =>
  <tr key={href}>
    <td>{type}</td>
    <td><a href={href}>{title}</a></td>
    <td colSpan={1}>
      <a href={sourceHref}>Zdroj dat</a>
    </td>
  </tr>
)

const ActionPage = ({
  action: { committee, title, date, number, documents, sourceHref },
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
          <td>{committee}</td>
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
          <td>
            <table>
              <tbody>
                <Documents documents={documents} />
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td colSpan={1}>
            <a href={sourceHref}>Zdroj dat</a>
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
