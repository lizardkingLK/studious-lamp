import {
  Authenticator,
  Divider,
  Flex,
  Heading,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Fragment, ReactNode } from "react";
import { Roboto_Mono } from "next/font/google";
import Link from "next/link";
import Head from "next/head";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

const PageLayout = (props: {
  title: string | undefined;
  children: ReactNode;
}) => {
  const { title, children } = props;

  return (
    <Authenticator className="container">
      {({ signOut, user }) => (
        <Fragment>
          <Head>
            <title>Studious - {title}</title>
          </Head>
          <View className={robotoMono.className}>
            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              alignContent="center"
              wrap="nowrap"
              gap="1rem"
              backgroundColor={"background.primary"}
              paddingTop={20}
              paddingBottom={20}
            >
              <View marginLeft={10}>
                <Heading level={4} fontWeight={800}>
                  Studious
                </Heading>
              </View>
              <Flex
                direction={"row"}
                gap={"1rem"}
                alignItems={"center"}
                alignSelf={"center"}
                marginRight={10}
              >
                <Link href={"/posts/create"} className="link">
                  <Heading level={5}>Create</Heading>
                </Link>
                <Link href={"/posts/view"} className="link">
                  <Heading level={5}>View</Heading>
                </Link>
                <Link href={"#"} className="link" onClick={signOut}>
                  <Heading level={5}>Sign Out</Heading>
                </Link>
              </Flex>
            </Flex>
            <Divider size="large" />
            {children}
          </View>
        </Fragment>
      )}
    </Authenticator>
  );
};

export default PageLayout;
