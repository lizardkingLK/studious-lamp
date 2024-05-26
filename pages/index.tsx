import "@aws-amplify/ui-react/styles.css";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import PageLayout from "@/components/layouts/page";
import { Divider, Flex, Heading, Text, View } from "@aws-amplify/ui-react";
import Link from "next/link";
import NewsContent from "@/components/layouts/preview";
import LoaderBar from "@/components/loader";

const client = generateClient<Schema>();

export default function App() {
  const [news, setNews] = useState<Array<Schema["News"]["type"]>>([]);

  const listNews = () => {
    client.models.News.observeQuery().subscribe({
      next: (data) => setNews([...data.items]),
    });
  };

  useEffect(() => {
    listNews();
  }, []);

  if (!news || news.length === 0) {
    return <LoaderBar />;
  }

  return (
    <PageLayout title="Home">
      {news.map(({ id, title, content, createdAt }) => {
        if (!content) {
          return null;
        }

        const newsContent: { [key: string]: string }[] = JSON.parse(
          content.toString()
        );
        if (newsContent.length === 0) {
          return null;
        }

        const element = newsContent[0];
        if (!element) {
          return null;
        }

        return (
          <View key={id} margin={10}>
            <Link href={`/posts/${id}`} className="link">
              <Flex direction={"column"} gap={"large"}>
                <Heading level={4}>{title}</Heading>
                <NewsContent content={element.value} type={element.key} />
                <Heading level={6} textAlign={"right"}>
                  Read More...
                </Heading>
                <Text
                  fontSize={"1rem"}
                  color={"font.secondary"}
                  textAlign={"right"}
                >
                  {new Date(createdAt).toLocaleDateString()}
                </Text>
              </Flex>
              <Divider />
            </Link>
          </View>
        );
      })}
    </PageLayout>
  );
}
