import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { getPublicAll } from "../api/getMeta";
import AuthorCard from "../components/AuthorCard";
import Layout from "../components/layout";
import PostCard from "../components/PostCard";
interface IndexProps {
  ipcNumber: string;
  since: string;
  ipcHref: string;
  logo: string;
  categories: string[];
  author: string;
  desc: string;
  authorLogo: string;
  postNum: number;
  catelogNum: number;
  tagNum: number;
  articles: any[];
}
const Home = (props: IndexProps) => {
  console.log(props.articles);
  return (
    <Layout
      title="Mereith's Blog"
      ipcNumber={props.ipcNumber}
      ipcHref={props.ipcHref}
      since={new Date(props.since)}
      logo={props.logo}
      categories={props.categories}
      sideBar={
        <AuthorCard
          catelogNum={props.catelogNum}
          postNum={props.postNum}
          tagNum={props.tagNum}
          author={props.author}
          logo={props.authorLogo}
          desc={props.desc}
        ></AuthorCard>
      }
    >
      <div>
        <PostCard
          title="测试"
          createdAt={new Date()}
          catelog="魔法上网"
          content={""}
          type={"overview"}
        ></PostCard>
      </div>
    </Layout>
  );
};

export default Home;
export async function getStaticProps(): Promise<{ props: IndexProps }> {
  const data = await getPublicAll();
  const siteInfo = data.meta.siteInfo;
  const { beianUrl, beianNumber, since, siteLogo } = siteInfo;
  const postNum = data.articles.length;
  const tagNum = data.tags.length;
  const catelogNum = data.categories.length;
  // 只需要10个文章
  const articles = data.articles.slice(0, 9);
  return {
    props: {
      ipcHref: beianUrl,
      ipcNumber: beianNumber,
      since: since,
      logo: siteLogo,
      categories: data.categories,
      author: siteInfo.author,
      desc: siteInfo.authorDesc,
      authorLogo: siteInfo.authorLogo,
      postNum: postNum,
      tagNum: tagNum,
      catelogNum: catelogNum,
      articles: articles,
    },
  };
}