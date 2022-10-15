import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Body from "../components/Body";

export default function Home() {
    const iconURL =
        "https://gov.proofofhumanity.id/uploads/default/optimized/1X/1fa810c24886c8a28548ef21b49869e18b849b55_2_32x32.png";
    return (
        <div className={styles.container}>
            <Head>
                <title>PoH Registry Level</title>
                <meta name="description" content="A poh registry level management" />
                <link rel="icon" type="image/png" href={iconURL}></link>
            </Head>
            <Header />
            <Body />
        </div>
    );
}
