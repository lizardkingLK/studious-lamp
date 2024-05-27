import "@aws-amplify/ui-react/styles.css";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import PageLayout from "@/components/layouts/page";
import {
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  View,
} from "@aws-amplify/ui-react";
import Link from "next/link";
import NewsContent from "@/components/layouts/preview";
import { getCurrentUser } from "aws-amplify/auth";

const client = generateClient<Schema>();

export enum statuses {
  draft = 1,
  publish = 2,
}

export default function App() {
  const [news, setNews] = useState<Array<Schema["News"]["type"]>>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const listNews = () => {
    client.models.News.observeQuery().subscribe({
      next: (data) => setNews([...data.items]),
    });
  };

  const handleRemove = (id: string) => {
    console.log({ id });
  };

  const markAsPublished = (id: string) => {
    console.log({ id });
  };

  const getUserId = async () => {
    setUserId((await getCurrentUser())?.userId ?? null);
  };

  useEffect(() => {
    listNews();
    getUserId();
  }, []);

  if (!news || news.length === 0 || !userId) {
    return (
      <PageLayout title="Home">
        <Text
          textAlign={"center"}
          position={"absolute"}
          top={"50%"}
          left={"50%"}
          transform={"translate(-50%, -50%)"}
        >
          No News Yet... ⌛
        </Text>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Home">
      {news.map(({ id, title, content, createdAt, createdBy, status }) => {
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
                <Flex
                  direction={"row"}
                  gap={"small"}
                  alignItems={"center"}
                  justifyContent={"flex-end"}
                  marginBottom={10}
                >
                  {status === statuses.draft && (
                    <Button onClick={() => markAsPublished(id)}>✅</Button>
                  )}
                  {createdBy === userId && (
                    <Button onClick={() => handleRemove(id)}>❌</Button>
                  )}
                  {userId + " " + createdBy}
                  <Text fontSize={"1rem"} color={"font.secondary"}>
                    {new Date(createdAt).toLocaleDateString()}
                  </Text>
                </Flex>
              </Flex>
              <Divider />
            </Link>
          </View>
        );
      })}
    </PageLayout>
  );
}
