import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import action, {
  TActionDetail,
  THlidacOnlyDoc,
  THlidacOnlyRecord,
} from "../../src/crawler/action";
import { TDocument } from "../../src/crawler/documents";
import { createHlidacJsonLink, createHlidacLink } from "../../src/utils";

const HlidacOnlyDocuments = ({
  hlidacOnlyDocuments,
}: {
  hlidacOnlyDocuments: THlidacOnlyDoc[] | THlidacOnlyRecord[];
}) => {
  const docHlidacOnlyRnds = hlidacOnlyDocuments.map(
    ({ title, documentUrl, hlidacLink }) => (
      <tr key={documentUrl}>
        <td>
          <a href={documentUrl}>{title}</a>
        </td>
        <td>
          <a href={hlidacLink}>Na hlídači</a>
        </td>
      </tr>
    )
  );

  return (
    <>
      {docHlidacOnlyRnds.length ? (
        <>
          <tr>
            <th className="error" colSpan={10}>
              Dokumenty nalezené pouze na hlídači:
            </th>
          </tr>
          {docHlidacOnlyRnds}
        </>
      ) : null}
    </>
  );
};

const Documents = ({ documents }: { documents: TDocument[] }) => {
  const docRnds = documents.map(
    ({ desc, filename, type, documentUrl, sourceUrl, hlidacLink }) => (
      <tr key={documentUrl}>
        <td>{type}</td>
        <td>
          <a href={documentUrl}>{desc}</a>
        </td>
        <td>
          <a href={documentUrl}>{filename}</a>
        </td>
        <td colSpan={1}>
          <a href={sourceUrl}>Zdroj dat</a>
        </td>
        <td colSpan={1}>
          {hlidacLink ? (
            type === "ZAZNAM" ? (
              <span>Na hlídači</span>
            ) : (
              <a href={hlidacLink}>Na hlídači</a>
            )
          ) : (
            <div className="error">Není na hlídači</div>
          )}
        </td>
      </tr>
    )
  );

  return <>{docRnds}</>;
};

const ActionPage = ({
  action: {
    hlidacId,
    committee,
    title,
    date,
    number,
    documents,
    records,
    sourceUrl,
    hlidacOnlyDocuments,
    hlidacOnlyRecords,
    hlidacJson,
  },
  errorStr,
}: {
  action: TActionDetail;
  errorStr?: string;
}) => {
  if (errorStr) {
    return <Layout title="Error">{errorStr}</Layout>;
  }
  return (
    <Layout title={title}>
      <h1>
        {committee} - {title}
      </h1>
      <a href={sourceUrl}>Source</a> | Hlídač:{" "}
      {!hlidacJson ? (
        <span className="error">Záznam nenalezen ({hlidacId})</span>
      ) : (
        <span>
          <a href={createHlidacLink(hlidacId)}>Web</a> /
          <a href={createHlidacJsonLink(hlidacId)}>JSON</a>
        </span>
      )}
      <hr />
      <table>
        <tbody>
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
                  <HlidacOnlyDocuments
                    hlidacOnlyDocuments={hlidacOnlyDocuments}
                  />
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th>Záznamy</th>
            <td>
              <table>
                <tbody>
                  <Documents documents={records} />
                  <HlidacOnlyDocuments
                    hlidacOnlyDocuments={hlidacOnlyRecords}
                  />
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      {/* <>{createHlidacUpdate(hlidacJson, documents)}</> */}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const url = decodeURIComponent(String(context.params?.href));
    const actionData = await action(url);

    return {
      props: { action: actionData },
    };
  } catch (e) {
    return {
      props: { action: {}, errorStr: e },
    };
  }
};

export default ActionPage;
