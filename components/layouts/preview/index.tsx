import { Text, View } from "@aws-amplify/ui-react";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import Link from "next/link";

const NewsContent = (props: { type: string; content: string }) => {
  const { type, content } = props;

  switch (type) {
    case "image":
      return (
        <View>
          <StorageImage alt={content} path={content} />
        </View>
      );

    case "url":
      return (
        <View>
          <Link href={content}>Click 🌐</Link>
        </View>
      );

    case "h1":
      return (
        <View>
          <Text variation="secondary" fontSize={"4rem"}>
            {content}
          </Text>
        </View>
      );

    case "h2":
      return (
        <View>
          <Text variation="secondary" fontSize={"3rem"}>
            {content}
          </Text>
        </View>
      );

    case "h3":
      return (
        <View>
          <Text variation="secondary" fontSize={"2rem"}>
            {content}
          </Text>
        </View>
      );

    case "paragraph":
      return (
        <View>
          <Text variation="secondary" fontSize={"1rem"}>
            {content}
          </Text>
        </View>
      );

    default:
      return null;
  }
};

export default NewsContent;
