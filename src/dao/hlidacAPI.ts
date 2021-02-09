import fetch from "node-fetch";

export interface DumpInfoModel {
  url?: string;
  date?: string;
  size?: number;
  fulldump?: boolean;
  created?: string;
  dataType?: string;
}

export interface Registration {
  id?: string;
  name?: string;
  datasetId?: string;
  origUrl?: string;
  sourcecodeUrl?: string;
  description?: string;
  jsonSchema?: string;
  createdBy?: string;
  created?: string;
  betaversion?: boolean;
  allowWriteAccess?: boolean;
  hidden?: boolean;
  searchResultTemplate?: Template;
  detailTemplate?: Template;
  defaultOrderBy?: string;
  orderList?: string[];
}

export interface Template {
  header?: string;
  body?: string;
  footer?: string;
  title?: string;
  properties?: string[];
}

export interface DSCreatedDTO {
  DatasetId?: string;
}

export interface DSItemResponseDTO {
  id?: string;
}

export interface Dotace {
  IdDotace?: string;
  DatumPodpisu?: string;
  DatumAktualizace?: string;
  KodProjektu?: string;
  NazevProjektu?: string;
  Zdroj?: Zdroj;
  Prijemce?: Prijemce;
  Program?: DotacniProgram;
  DotaceCelkem?: number;
  PujckaCelkem?: number;
  Rozhodnuti?: Rozhodnuti[];
  Duplicita?: string;
  Chyba?: string[];
}

export interface Zdroj {
  Nazev?: string;
  Url?: string;
}

export interface Prijemce {
  Ico?: string;
  ObchodniJmeno?: string;
  HlidacJmeno?: string;
  Jmeno?: string;
  RokNarozeni?: number;
  Obec?: string;
  Okres?: string;
  PSC?: string;
}

export interface DotacniProgram {
  Id?: string;
  Nazev?: string;
  Kod?: string;
  Url?: string;
}

export interface Rozhodnuti {
  CastkaPozadovana?: number;
  CastkaRozhodnuta?: number;
  CerpanoCelkem?: number;
  JePujcka?: boolean;
  IcoPoskytovatele?: string;
  Poskytovatel?: string;
  Rok?: number;
  ZdrojFinanci?: string;
  Cerpani?: Cerpani[];
}

export interface Cerpani {
  CastkaSpotrebovana?: number;
  Rok?: number;
  GuessedYear?: number;
}

export interface FirmaDTO {
  ICO?: string;
  Jmeno?: string;
  DatoveSchranky?: string[];
  Zalozena?: string;
}

export interface Rizeni {
  IsFullRecord?: boolean;
  SpisovaZnacka?: string;
  Stav?: string;
  Vyskrtnuto?: string;
  Url?: string;
  DatumZalozeni?: string;
  PosledniZmena?: string;
  Soud?: string;
  Dokumenty?: Dokument[];
  Dluznici?: Osoba[];
  Veritele?: Osoba[];
  Spravci?: Osoba[];
  OnRadar?: boolean;
  Odstraneny?: boolean;
}

export interface Dokument {
  Id?: string;
  TypUdalosti?: number;
  DatumVlozeni?: string;
  Popis?: string;
  Url?: string;
  Oddil?: string;
  PlainText?: string;
  Lenght?: number;
  WordCount?: number;
  LastUpdate?: string;
  EnoughExtractedText?: boolean;
}

export interface Osoba {
  IdPuvodce?: string;
  IdOsoby?: string;
  PlneJmeno?: string;
  Role?: string;
  Typ?: string;
  ICO?: string;
  Rc?: string;
  Zalozen?: string;
  Odstranen?: string;
  DatumNarozeni?: string;
  Mesto?: string;
  Okres?: string;
  Zeme?: string;
  Psc?: string;
  OsobaId?: string;
}

export interface OsobaDetailDTO {
  TitulPred?: string;
  Jmeno?: string;
  Prijmeni?: string;
  TitulPo?: string;
  Narozeni?: string;
  NameId?: string;
  Profile?: string;
  Sponzoring?: OsobaEventDTO[];
  Udalosti?: OsobaEventDTO[];
  SocialniSite?: SocialNetworkDTO[];
}

export interface OsobaEventDTO {
  Typ?: string;
  Organizace?: string;
  Role?: string;
  Castka?: number;
  DatumOd?: string;
  DatumDo?: string;
}

export interface SocialNetworkDTO {
  Type?: string;
  Id?: string;
  Url?: string;
}

export interface OsobaDTO {
  TitulPred?: string;
  Jmeno?: string;
  Prijmeni?: string;
  TitulPo?: string;
  Narozeni?: string;
  NameId?: string;
  Profile?: string;
}

export interface OsobaSocialDTO {
  TitulPred?: string;
  Jmeno?: string;
  Prijmeni?: string;
  TitulPo?: string;
  NameId?: string;
  Profile?: string;
  SocialniSite?: SocialNetworkDTO[];
}

export interface Smlouva {
  identifikator?: TIdentifikator;
  CalculatedPriceWithVATinCZK?: number;
  CalcutatedPriceQuality?: 0 | 1 | 2 | 3 | 4 | 5;
  casZverejneni?: string;
  cisloSmlouvy?: string;
  ciziMena?: TSmlouvaCiziMena;
  Classification?: SClassification;
  ConfidenceValue?: number;
  datumUzavreni?: string;
  Enhancements?: Enhancement[];
  hodnotaBezDph?: number;
  hodnotaVcetneDph?: number;
  Id?: string;
  Issues?: Issue[];
  LastUpdate?: string;
  navazanyZaznam?: string;
  odkaz?: string;
  Platce?: Subjekt;
  platnyZaznam?: boolean;
  PravniRamec?: 0 | 1 | 2 | 3;
  predmet?: string;
  Prijemce?: Subjekt[];
  Prilohy?: Priloha[];
  schvalil?: string;
  souvisejiciSmlouvy?: string[];
  spadaPodRS?: boolean;
  SVazbouNaPolitiky?: boolean;
  SVazbouNaPolitikyAktualni?: boolean;
  SVazbouNaPolitikyNedavne?: boolean;
  Hint?: HintSmlouva;
  VkladatelDoRejstriku?: Subjekt;
}

export interface TIdentifikator {
  idSmlouvy?: string;
  idVerze?: string;
}

export interface TSmlouvaCiziMena {
  hodnota?: number;
  mena?: string;
}

export interface SClassification {
  LastUpdate?: string;
  Version?: number;
  Types?: Classification[];
}

export interface Enhancement {
  Created?: string;
  Title?: string;
  Description?: string;
  Changed?: Change;
  Public?: boolean;
  EnhancerType?: string;
}

export interface Issue {
  IssueTypeId?: number;
  Created?: string;
  Title?: string;
  TextDescription?: string;
  Public?: boolean;
  Permanent?: boolean;
  Importance?: 0 | 1 | 5 | 20 | 100 | -1;
  AffectedParams?: KeyValue[];
  AnalyzerType?: string;
}

export interface Subjekt {
  adresa?: string;
  datovaSchranka?: string;
  ico?: string;
  nazev?: string;
  utvar?: string;
}

export interface Priloha {
  FileMetadata?: KeyVal[];
  data?: string;
  nazevSouboru?: string;
  hash?: THash;
  odkaz?: string;
  PlainTextContent?: string;
  PlainTextContentQuality?: 0 | 1 | 2 | 3 | 4 | 5;
  LastUpdate?: string;
  LocalCopy?: string;
  ContentType?: string;
  Lenght?: number;
  WordCount?: number;
  UniqueWordsCount?: number;
  WordsVariance?: number;
  Pages?: number;
  EnoughExtractedText?: boolean;
}

export interface HintSmlouva {
  SmlouvaULimitu?: number;
  DenUzavreni?: number;
  SmlouvaSPolitickyAngazovanymSubjektem?: number;
  PocetDniOdZalozeniFirmy?: number;
  VztahSeSoukromymSubjektem?: number;
}

export interface Classification {
  TypeValue?: number;
  ClassifProbability?: number;
  RootClassification?: boolean;
}

export interface Change {
  ParameterName?: string;
  PreviousValue?: string;
  NewValue?: string;
}

export interface KeyValue {
  Key?: string;
  Value?: string;
}

export interface KeyVal {
  Key?: string;
  Value?: string;
}

export interface THash {
  algoritmus?: string;
  Value?: string;
}

export interface VerejnaZakazka {
  OnlyOnProfile?: boolean;
  Id?: string;
  EvidencniCisloZakazky?: string;
  ZakazkaNaProfiluId?: string;
  Formulare?: Formular[];
  Kriteria?: HodnoticiKriteria[];
  DisplayId?: number;
  Dataset?: string;
  Zadavatel?: Subject;
  Dodavatele?: Subject[];
  NazevZakazky?: string;
  PopisZakazky?: string;
  Dokumenty?: Document[];
  CPV?: string[];
  DatumUverejneni?: string;
  LhutaDoruceni?: string;
  DatumUzavreniSmlouvy?: string;
  PosledniZmena?: string;
  StavVZ?: number;
  StavZakazky?: 0 | 1 | 50 | 100 | 200 | 300;
  LastUpdated?: string;
  OdhadovanaHodnotaBezDPH?: number;
  KonecnaHodnotaBezDPH?: number;
  OdhadovanaHodnotaMena?: string;
  KonecnaHodnotaMena?: string;
  RawHtml?: string;
}

export interface Formular {
  Cislo?: string;
  Druh?: string;
  TypFormulare?: string;
  LimitVZ?: string;
  DruhRizeni?: string;
  Zverejnen?: string;
  URL?: string;
  OnlyOnProfile?: boolean;
}

export interface HodnoticiKriteria {
  Poradi?: number;
  Kriterium?: string;
  Nazev?: string;
  Vaha?: number;
}

export interface Subject {
  ICO?: string;
  Jmeno?: string;
}

export interface Document {
  OficialUrl?: string;
  DirectUrl?: string;
  TypDokumentu?: string;
  VlozenoNaProfil?: string;
  CisloVerze?: string;
  PlainText?: string;
  PlainTextContentQuality?: 0 | 1 | 2 | 3 | 4 | 5;
  LastUpdate?: string;
  LastProcessed?: string;
  ContentType?: string;
  Lenght?: number;
  WordCount?: number;
  Pages?: number;
  StorageId?: string;
  PlainDocumentId?: string;
  Name?: string;
  EnoughExtractedText?: boolean;
}

export interface Voice2Text {
  dataset?: string;
  itemid?: string;
}

export interface ZabHost {
  hostid?: string;
  host?: string;
  url?: string;
  opendataUrl?: string;
  pageUrl?: string;
  urad?: string;
  publicname?: string;
  popis?: string;
  hash?: string;
}

export interface WebStatusExport {
  Availability?: ZabHostAvailability;
  SSL?: SslData;
  DetailUrl?: string;
}

export interface ZabHostAvailability {
  Host?: ZabHost;
  Data?: ZabAvailability[];
}

export interface SslData {
  Grade?: string;
  LatestCheck?: string;
  Copyright?: string;
  FullReport?: string;
}

export interface ZabAvailability {
  Time?: string;
  Response?: number;
  HttpStatusCode?: number;
}

export interface SearchResultDTORegistration {
  Total?: number;
  Page?: number;
  Results?: Registration[];
}

export interface SearchResultDTOObject {
  Total?: number;
  Page?: number;
  Results?: object[];
}

export interface SearchResultDTODotace {
  Total?: number;
  Page?: number;
  Results?: Dotace[];
}

export interface SearchResultDTORizeni {
  Total?: number;
  Page?: number;
  Results?: Rizeni[];
}

export interface SearchResultDTOSmlouva {
  Total?: number;
  Page?: number;
  Results?: Smlouva[];
}

export interface SearchResultDTOVerejnaZakazka {
  Total?: number;
  Page?: number;
  Results?: VerejnaZakazka[];
}

export type RequestParams = Omit<RequestInit, "body" | "method"> & {
  secure?: boolean;
};

export type RequestQueryParamsType = Record<string | number, any>;

interface ApiConfig<SecurityDataType> {
  baseUrl?: string;
  baseApiParams?: RequestParams;
  securityWorker?: (securityData: SecurityDataType) => RequestParams;
}

interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

enum BodyType {
  Json,
  FormData,
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://www.hlidacstatu.cz";
  private securityData: SecurityDataType = null as any;
  private securityWorker:
    | null
    | ApiConfig<SecurityDataType>["securityWorker"] = null;

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: RequestQueryParamsType, key: string) {
    return (
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(
        Array.isArray(query[key]) ? query[key].join(",") : query[key]
      )
    );
  }

  protected addQueryParams(rawQuery?: RequestQueryParamsType): string {
    const query = rawQuery ?? {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key]
    );
    return keys.length
      ? `?${keys
          .map((key) =>
            typeof query[key] === "object" && !Array.isArray(query[key])
              ? this.addQueryParams(query[key] as object).substring(1)
              : this.addQueryParam(query, key)
          )
          .join("&")}`
      : "";
  }

  private bodyFormatters: Record<BodyType, (input: any) => any> = {
    [BodyType.Json]: JSON.stringify,
    [BodyType.FormData]: (input: any) =>
      Object.keys(input).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
  };

  private mergeRequestOptions(
    params: RequestParams,
    securityParams?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params,
      ...(securityParams ?? {}),
      headers: {
        ...(this.baseApiParams.headers ?? {}),
        ...(params.headers ?? {}),
        ...((securityParams && securityParams.headers) ?? {}),
      },
    };
  }

  private safeParseResponse = <T = any, E = any>(
    response: Response
  ): Promise<HttpResponse<T, E>> => {
    const r = response as HttpResponse<T, E>;
    r.data = (null as unknown) as T;
    r.error = (null as unknown) as E;

    return response
      .json()
      .then((data) => {
        if (r.ok) {
          r.data = data;
        } else {
          r.error = data;
        }
        return r;
      })
      .catch((e) => {
        r.error = e;
        return r;
      });
  };

  public request = <T = any, E = any>(
    path: string,
    method: string,
    { secure, ...params }: RequestParams = {},
    body?: any,
    bodyType?: BodyType,
    secureByDefault?: boolean
  ): Promise<HttpResponse<T>> => {
    const requestUrl = `${this.baseUrl}${path}`;
    const secureOptions =
      (secureByDefault ?? secure) && this.securityWorker
        ? this.securityWorker(this.securityData)
        : {};
    const requestOptions = {
      ...this.mergeRequestOptions(params, secureOptions),
      method,
      body: body ? this.bodyFormatters[bodyType ?? BodyType.Json](body) : null,
    };

    return fetch(requestUrl, requestOptions as any).then(async (response) => {
      const data = await this.safeParseResponse<T, E>(response as any);
      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title HlidacStatu Api V2.1.1
 * @version v2
 * @baseUrl https://www.hlidacstatu.cz
 * REST API Hlídače státu
 */
export class Api<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Core
     * @name ApiV2Ping
     * @request GET:/api/v2/ping/{text}
     */
    apiV2Ping: (text: string, params?: RequestParams) =>
      this.request<string, any>(`/api/v2/ping/${text}`, "GET", params),

    /**
     * No description
     *
     * @tags Core
     * @name ApiV2GetIp
     * @request GET:/api/v2/getmyip
     */
    apiV2GetIp: (params?: RequestParams) =>
      this.request<string, any>(`/api/v2/getmyip`, "GET", params),

    /**
     * No description
     *
     * @tags Core
     * @name ApiV2Dumps
     * @request GET:/api/v2/dumps
     */
    apiV2Dumps: (params?: RequestParams) =>
      this.request<DumpInfoModel[], any>(`/api/v2/dumps`, "GET", params),

    /**
     * No description
     *
     * @tags Core
     * @name ApiV2Dump
     * @request GET:/api/v2/dump/{datatype}/{date}
     */
    apiV2Dump: (datatype: string, date: string, params?: RequestParams) =>
      this.request<object, any>(
        `/api/v2/dump/${datatype}/${date}`,
        "GET",
        params
      ),

    /**
     * No description
     *
     * @tags Datasety
     * @name ApiV2DatasetyGetAll
     * @summary Načte seznam datasetů
     * @request GET:/api/v2/datasety
     */
    apiV2DatasetyGetAll: (params?: RequestParams) =>
      this.request<SearchResultDTORegistration, any>(
        `/api/v2/datasety`,
        "GET",
        params
      ),

    /**
     * @description Není možné změnit hodnoty jsonSchema a datasetId. Pokud je potřebuješ změnit, musíš datovou sadu smazat a zaregistrovat znovu. Ukázkový požadavek: https://raw.githubusercontent.com/HlidacStatu/API/master/v2/create_dataset.example.json
     *
     * @tags Datasety
     * @name ApiV2DatasetyUpdate
     * @summary Update datasetu.
     * @request PUT:/api/v2/datasety
     */
    apiV2DatasetyUpdate: (data: Registration, params?: RequestParams) =>
      this.request<Registration, any>(`/api/v2/datasety`, "PUT", params, data),

    /**
     * @description Ukázkový požadavek: https://raw.githubusercontent.com/HlidacStatu/API/master/v2/create_dataset.example.json
     *
     * @tags Datasety
     * @name ApiV2DatasetyCreate
     * @summary Vytvoří nový dataset
     * @request POST:/api/v2/datasety
     */
    apiV2DatasetyCreate: (data: Registration, params?: RequestParams) =>
      this.request<DSCreatedDTO, any>(`/api/v2/datasety`, "POST", params, data),

    /**
     * No description
     *
     * @tags Datasety
     * @name ApiV2DatasetyDetail
     * @summary Detail konkrétního datasetu
     * @request GET:/api/v2/datasety/{datasetId}
     */
    apiV2DatasetyDetail: (datasetId: string, params?: RequestParams) =>
      this.request<Registration, any>(
        `/api/v2/datasety/${datasetId}`,
        "GET",
        params
      ),

    /**
     * No description
     *
     * @tags Datasety
     * @name ApiV2DatasetyDelete
     * @summary Smazání datasetu
     * @request DELETE:/api/v2/datasety/{datasetId}
     */
    apiV2DatasetyDelete: (datasetId: string, params?: RequestParams) =>
      this.request<boolean, any>(
        `/api/v2/datasety/${datasetId}`,
        "DELETE",
        params
      ),

    /**
     * No description
     *
     * @tags Datasety
     * @name ApiV2DatasetyDatasetSearch
     * @summary Vyhledávání v položkách datasetu
     * @request GET:/api/v2/datasety/{datasetId}/hledat
     */
    apiV2DatasetyDatasetSearch: (
      datasetId: string,
      query?: { dotaz?: string; strana?: number; sort?: string; desc?: string },
      params?: RequestParams
    ) =>
      this.request<SearchResultDTOObject, any>(
        `/api/v2/datasety/${datasetId}/hledat${this.addQueryParams(query)}`,
        "GET",
        params
      ),

    /**
     * No description
     *
     * @tags Datasety
     * @name ApiV2DatasetyDatasetItemGet
     * @summary Detail konkrétní položky z datasetu
     * @request GET:/api/v2/datasety/{datasetId}/zaznamy/{itemId}
     */
    apiV2DatasetyDatasetItemGet: (
      datasetId: string,
      itemId: string,
      params?: RequestParams
    ) =>
      this.request<object, any>(
        `/api/v2/datasety/${datasetId}/zaznamy/${itemId}`,
        "GET",
        params
      ),

    /**
     * No description
     *
     * @tags Datasety
     * @name ApiV2DatasetyDatasetItemUpdate
     * @summary Vloží nebo updatuje záznam v datasetu
     * @request POST:/api/v2/datasety/{datasetId}/zaznamy/{itemId}
     */
    apiV2DatasetyDatasetItemUpdate: (
      datasetId: string,
      itemId: string,
      data: object,
      query?: { mode?: string },
      params?: RequestParams
    ) =>
      this.request<DSItemResponseDTO, any>(
        `/api/v2/datasety/${datasetId}/zaznamy/${itemId}${this.addQueryParams(
          query
        )}`,
        "POST",
        params,
        data
      ),

    /**
     * @description Pokud záznamy s daným ID existují, tak budou přepsány. Ukázkový požadavek: [ { "HsProcessType": "person", "Id": "2", "jmeno": "Ferda", "prijmeni": "Mravenec", "narozeni": "2018-11-13T20:20:39+00:00" }, { "HsProcessType": "document", "Id": "broukpytlik", "jmeno": "Brouk", "prijmeni": "Pytlík", "narozeni": "2017-12-10T00:00:00+00:00", "DocumentUrl": "www.hlidacstatu.cz", "DocumentPlainText": null } ]
     *
     * @tags Datasety
     * @name ApiV2DatasetyDatasetItemBulkInsert
     * @summary Hromadné vkládání záznamů
     * @request POST:/api/v2/datasety/{datasetId}/zaznamy
     */
    apiV2DatasetyDatasetItemBulkInsert: (
      datasetId: string,
      data: object,
      params?: RequestParams
    ) =>
      this.request<DSItemResponseDTO[], any>(
        `/api/v2/datasety/${datasetId}/zaznamy`,
        "POST",
        params,
        data
      ),

    /**
     * No description
     *
     * @tags Datasety
     * @name ApiV2DatasetyDatasetItemExists
     * @summary Kontrola, jestli záznam existuje v datasetu
     * @request GET:/api/v2/datasety/{datasetId}/zaznamy/{itemId}/existuje
     */
    apiV2DatasetyDatasetItemExists: (
      datasetId: string,
      itemId: string,
      params?: RequestParams
    ) =>
      this.request<boolean, any>(
        `/api/v2/datasety/${datasetId}/zaznamy/${itemId}/existuje`,
        "GET",
        params
      ),

    /**
     * No description
     *
     * @tags Dotace
     * @name ApiV2DotaceHledat
     * @summary Vyhledá dotace
     * @request GET:/api/v2/dotace/hledat
     */
    apiV2DotaceHledat: (
      query?: { dotaz?: string; strana?: number; razeni?: number },
      params?: RequestParams
    ) =>
      this.request<SearchResultDTODotace, any>(
        `/api/v2/dotace/hledat${this.addQueryParams(query)}`,
        "GET",
        params
      ),

    /**
     * No description
     *
     * @tags Dotace
     * @name ApiV2DotaceDetail
     * @summary Vrátí detail jedné dotace.
     * @request GET:/api/v2/dotace/{id}
     */
    apiV2DotaceDetail: (id: string, params?: RequestParams) =>
      this.request<Dotace, any>(`/api/v2/dotace/${id}`, "GET", params),

    /**
     * No description
     *
     * @tags Firmy
     * @name ApiV2FirmyCompanyPerIco
     * @summary Vyhledá firmu v databázi Hlídače státu.
     * @request GET:/api/v2/firmy/ico/{ico}
     */
    apiV2FirmyCompanyPerIco: (ico: string, params?: RequestParams) =>
      this.request<FirmaDTO, any>(`/api/v2/firmy/ico/${ico}`, "GET", params),

    /**
     * No description
     *
     * @tags Firmy
     * @name ApiV2FirmyCompanyId
     * @summary Vyhledá firmu v databázi Hlídače státu.
     * @request GET:/api/v2/firmy/{jmenoFirmy}
     */
    apiV2FirmyCompanyId: (jmenoFirmy: string, params?: RequestParams) =>
      this.request<FirmaDTO, any>(`/api/v2/firmy/${jmenoFirmy}`, "GET", params),

    /**
     * @description Toto API je pouze pro držitele komerční licence. Kontaktujte nás na api@hlidacstatu.cz.
     *
     * @tags Insolvence
     * @name ApiV2InsolvenceHledat
     * @summary Vyhledá smlouvy v databázi smluv
     * @request GET:/api/v2/insolvence/hledat
     */
    apiV2InsolvenceHledat: (
      query?: { dotaz?: string; strana?: number; razeni?: number },
      params?: RequestParams
    ) =>
      this.request<SearchResultDTORizeni, any>(
        `/api/v2/insolvence/hledat${this.addQueryParams(query)}`,
        "GET",
        params
      ),

    /**
     * @description Toto API je pouze pro držitele komerční licence. Kontaktujte nás na api@hlidacstatu.cz.
     *
     * @tags Insolvence
     * @name ApiV2InsolvenceDetail
     * @summary Vrátí detail jedné smlouvy.
     * @request GET:/api/v2/insolvence/{id}
     */
    apiV2InsolvenceDetail: (id: string, params?: RequestParams) =>
      this.request<Rizeni, any>(`/api/v2/insolvence/${id}`, "GET", params),

    /**
     * No description
     *
     * @tags Osoby
     * @name ApiV2OsobyDetail
     * @summary Vypíše detail osoby na základě "osobaId" parametru.
     * @request GET:/api/v2/osoby/{osobaId}
     */
    apiV2OsobyDetail: (osobaId: string, params?: RequestParams) =>
      this.request<OsobaDetailDTO, any>(
        `/api/v2/osoby/${osobaId}`,
        "GET",
        params
      ),

    /**
     * No description
     *
     * @tags Osoby
     * @name ApiV2OsobySearch
     * @request GET:/api/v2/osoby/hledat
     */
    apiV2OsobySearch: (
      query?: { dotaz?: string; strana?: number },
      params?: RequestParams
    ) =>
      this.request<OsobaDTO[], any>(
        `/api/v2/osoby/hledat${this.addQueryParams(query)}`,
        "GET",
        params
      ),

    /**
     * No description
     *
     * @tags Osoby
     * @name ApiV2OsobySocial
     * @request GET:/api/v2/osoby/social
     */
    apiV2OsobySocial: (
      query: {
        typ: (
          | "Twitter"
          | "Facebook_page"
          | "Facebook_profile"
          | "Instagram"
          | "www"
          | "Youtube"
        )[];
      },
      params?: RequestParams
    ) =>
      this.request<OsobaSocialDTO[], any>(
        `/api/v2/osoby/social${this.addQueryParams(query)}`,
        "GET",
        params
      ),

    /**
     * No description
     *
     * @tags Smlouvy
     * @name ApiV2SmlouvyHledat
     * @summary Vyhledá smlouvy v databázi smluv
     * @request GET:/api/v2/smlouvy/hledat
     */
    apiV2SmlouvyHledat: (
      query?: { dotaz?: string; strana?: number; razeni?: number },
      params?: RequestParams
    ) =>
      this.request<SearchResultDTOSmlouva, any>(
        `/api/v2/smlouvy/hledat${this.addQueryParams(query)}`,
        "GET",
        params
      ),

    /**
     * No description
     *
     * @tags Smlouvy
     * @name ApiV2SmlouvyDetail
     * @summary Vrátí detail jedné smlouvy.
     * @request GET:/api/v2/smlouvy/{id}
     */
    apiV2SmlouvyDetail: (id: string, params?: RequestParams) =>
      this.request<Smlouva, any>(`/api/v2/smlouvy/${id}`, "GET", params),

    /**
     * No description
     *
     * @tags Smlouvy
     * @name ApiV2SmlouvyVsechnaId
     * @summary všechna ID platných verzí smluv. (API pouze pro komerční licence)
     * @request GET:/api/v2/smlouvy/vsechnaID
     */
    apiV2SmlouvyVsechnaId: (params?: RequestParams) =>
      this.request<string[], any>(`/api/v2/smlouvy/vsechnaID`, "GET", params),

    /**
     * No description
     *
     * @tags Smlouvy
     * @name ApiV2SmlouvyText
     * @request GET:/api/v2/smlouvy/text/{id}
     */
    apiV2SmlouvyText: (id: string, params?: RequestParams) =>
      this.request<string[], any>(`/api/v2/smlouvy/text/${id}`, "GET", params),

    /**
     * @description Toto API je pouze pro držitele komerční licence. Kontaktujte nás na api@hlidacstatu.cz.
     *
     * @tags Veřejné zakázky
     * @name ApiV2VzDetail
     * @summary Detail veřejné zakázky
     * @request GET:/api/v2/verejnezakazky/{id}
     */
    apiV2VzDetail: (id: string, params?: RequestParams) =>
      this.request<VerejnaZakazka, any>(
        `/api/v2/verejnezakazky/${id}`,
        "GET",
        params
      ),

    /**
     * @description Toto API je pouze pro držitele komerční licence. Kontaktujte nás na api@hlidacstatu.cz.
     *
     * @tags Veřejné zakázky
     * @name ApiV2VzHledat
     * @summary Vyhledá veřejné zakázky v databázi Hlídače smluv
     * @request GET:/api/v2/verejnezakazky/hledat
     */
    apiV2VzHledat: (
      query?: { dotaz?: string; strana?: number; razeni?: number },
      params?: RequestParams
    ) =>
      this.request<SearchResultDTOVerejnaZakazka, any>(
        `/api/v2/verejnezakazky/hledat${this.addQueryParams(query)}`,
        "GET",
        params
      ),

    /**
     * No description
     *
     * @tags Voice 2 Text
     * @name ApiV2InternalQVoice2TextNewTask
     * @summary Vytvori novy task
     * @request POST:/api/v2/internalq/Voice2TextNewTask/{datasetId}/{itemId}
     */
    apiV2InternalQVoice2TextNewTask: (
      datasetId: string,
      itemId: string,
      query?: { priority?: number },
      params?: RequestParams
    ) =>
      this.request<string, any>(
        `/api/v2/internalq/Voice2TextNewTask/${datasetId}/${itemId}${this.addQueryParams(
          query
        )}`,
        "POST",
        params
      ),

    /**
     * No description
     *
     * @tags Voice 2 Text
     * @name ApiV2InternalQVoice2TextGetTask
     * @summary Vrátí taskID pro Voice2Text Docker image
     * @request GET:/api/v2/internalq/Voice2TextGetTask
     */
    apiV2InternalQVoice2TextGetTask: (params?: RequestParams) =>
      this.request<Voice2Text, any>(
        `/api/v2/internalq/Voice2TextGetTask`,
        "GET",
        params
      ),

    /**
     * No description
     *
     * @tags Voice 2 Text
     * @name ApiV2InternalQVoice2TextDone
     * @summary Potvrdí ukončení Voice2Text operace
     * @request POST:/api/v2/internalq/Voice2TextDone
     */
    apiV2InternalQVoice2TextDone: (task: Voice2Text, params?: RequestParams) =>
      this.request<string, any>(
        `/api/v2/internalq/Voice2TextDone`,
        "POST",
        params,
        task
      ),

    /**
     * No description
     *
     * @tags Voice 2 Text
     * @name ApiV2InternalQVoice2TextFailed
     * @summary Potvrdí ukončení Voice2Text operace
     * @request POST:/api/v2/internalq/Voice2TextFailed/{requeueAsTheLast}
     */
    apiV2InternalQVoice2TextFailed: (
      requeueAsTheLast: boolean,
      task: Voice2Text,
      params?: RequestParams
    ) =>
      this.request<string, any>(
        `/api/v2/internalq/Voice2TextFailed/${requeueAsTheLast}`,
        "POST",
        params,
        task
      ),

    /**
     * No description
     *
     * @tags Weby
     * @name ApiV2WebyList
     * @request GET:/api/v2/Weby
     */
    apiV2WebyList: (params?: RequestParams) =>
      this.request<ZabHost[], any>(`/api/v2/Weby`, "GET", params),

    /**
     * No description
     *
     * @tags Weby
     * @name ApiV2WebyStatus
     * @request GET:/api/v2/Weby/{id}
     */
    apiV2WebyStatus: (id: string, params?: RequestParams) =>
      this.request<WebStatusExport, any>(`/api/v2/Weby/${id}`, "GET", params),
  };
}
