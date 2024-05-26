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
  console.log({ her: Array.from(newsContent) });
  if (newsContent.length === 0) {
    return null;
  }

  return (
    <PageLayout title={title}>
      <Flex direction={"column"} gap={"small"} marginLeft={10} marginTop={10}>
        <Heading level={2}>{news.title}</Heading>
        <Heading level={6} color={"font.secondary"}>
          {new Date(news.createdAt).toLocaleDateString()}
        </Heading>
        {Array.from(newsContent)?.map((element, index) => (
          <NewsContent key={index} content={element.value} type={element.key} />
        ))}
      </Flex>
    </PageLayout>
  );
};

export default ViewNews;
