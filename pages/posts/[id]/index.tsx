import { Flex, Heading } from "@aws-amplify/ui-react";
import PageLayout from "@/components/layouts/page";
import { generateClient } from "aws-amplify/data";
import React, { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Schema } from "@/amplify/data/resource";
import LoaderBar from "@/components/loader";
import NewsContent from "@/components/layouts/preview";

const client = generateClient<Schema>();

export const getNews = async (id: string) => {
  const newsId = id;
  if (!newsId) {
    return null;
  }

  const { data } = await client.models.News.get({ id: newsId });
  if (!data) {
    return null;
  }

  return data;
};

const ViewNews = () => {
  const [title, setTitle] = useState<string>("");
  const [news, setNews] = useState<Schema["News"]["type"]>();
  const newsId = (usePathname() ?? "").replace("/posts/", "");

  useMemo(() => {
    getNews(newsId).then((data) => {
      if (!data || !data.title) {
        return;
      }

      setTitle(data.title);
      setNews(data);
    });
  }, [newsId]);

  if (!news) {
    return <LoaderBar />;
  }

  const newsContent: { [key: string]: string }[] = JSON.parse(
    news.content?.toString() ?? "[]"
  );
  if (newsContent.length === 0) {
    return null;
  }

  const convertObject = (
    content: Object | Array<{ [key: string]: string }>
  ) => {
    if (Array.isArray(content)) {
      return content;
    } else {
      return Object.entries(content).reduce((r, [key, value]) => {
        Object.values(value).forEach((val, i) => {
          r[i] = { ...(r[i] || {}), [key]: val };
        });
        return r;
      });
    }
  };

  return (
    <PageLayout title={title}>
      <Flex direction={"column"} gap={"small"} marginLeft={10} marginTop={10}>
        <Heading level={2}>{news.title}</Heading>
        <Heading level={6} color={"font.secondary"}>
          {new Date(news.createdAt).toLocaleDateString()}
        </Heading>
        {convertObject(newsContent)?.map((element, index) => (
          <NewsContent key={index} content={element.value} type={element.key} />
        ))}
      </Flex>
    </PageLayout>
  );
};

export default ViewNews;
