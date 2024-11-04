// src/pages/about.tsx
import Head from 'next/head';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageSlider from './components/ImageSlider';

const images = [
    'https://pangolinphoto.com/wp-content/uploads/2021/12/pangolin-widlife-photo-safari-tips.jpg',
    'https://www.texasamhotelcc.com/site/assets/files/11338/aggie-land-safari.2000x500.webp',
    'https://tvmwildlife.com/static/media/inner-banner1.28fed3258dc207f62741.jpg',
    'https://www.startus.cc/sites/default/files/styles/company_profile_cover_crop/public/sri-lanka-banner.jpg?itok=vNkItDxr&sc=6645af27da5c91150aa6791db2a1c330',
    'https://neprimateconservancy.org/wp-content/uploads/2023/04/Primate-Pros-Banner-10-%C3%97-3-in-April-2023-2.jpg',
    'https://badoca.com/wp-content/uploads/Grou-pequeno_banner.jpg',
    'https://badoca.com/wp-content/uploads/Porco-Espinho_banner.jpg',
    'https://www.startus.cc/sites/default/files/styles/company_profile_cover_crop/public/burigi-chato-safari-tanzania-safari-pictures-serengeti-ngorongoro-lake-manyara-tarangire-arusha-national-park_260.jpg?itok=HWATDaIt&sc=51ef17663f392ed96f97ef7eb3282b50',
    'https://www.pangolinphoto.com/wp-content/uploads/2022/10/south-africa-photo-safari-packages-workshops.jpg.webp',
    'https://raesafaris.co.za/wp-content/uploads/2018/10/Wild-Dog-banner-3.jpg',
    'https://cdnsm5-hosted.civiclive.com/UserFiles/Servers/Server_1881137/Image/Residents/Animal%20Services/Animal-banner-4.jpg',
    'https://www.servcorp.com/media/4237/greeninitiatives-banner1.jpg?format=webp&quality=80&width=1920',
    'https://badoca.com/wp-content/uploads/cegonha-de-abdin_banner.jpg',
    'https://badoca.com/wp-content/uploads/Coati-de-cauda-anelada_banner.jpg',
    'https://www.brightblue.org.uk/wp-content/uploads/2020/10/red-squirrel-banner.png',
    'https://badoca.com/wp-content/uploads/Faisao-Venerado_banner.jpg',
    'https://a.storyblok.com/f/108167/2000x500/51c3605b28/6a2402e3-0535-4977-9087-d032822125a2.jpg',
    'https://a.storyblok.com/f/108167/2000x500/877cbd1221/24198305-5b53-4ebf-b7e3-c6f7f975557a.jpg',
    'https://badoca.com/wp-content/uploads/Abibe-de-mascara_banner.jpg',
    'https://www.koshercasas.com/page_images/about-galapagos.jpg',
    'https://badoca.com/wp-content/uploads/hiena-malhada_banner.jpg',
    'https://badoca.com/wp-content/uploads/caturra_banner.jpg',
    'https://assets.kpmg.com/is/image/kpmg/pt-cop28-banner:cq5dam.web.2000.500',
    'https://www.tattonpark.org.uk/Images/Evening-Deer-Walk-Collage.jpg',
    'https://a.storyblok.com/f/108167/2000x500/57a9d6dc7c/a0a8b71f-0af2-4f09-82b6-a4fc1d15bfd6.jpg',
    'https://www.shopwoodstockhardware.com/wp-content/uploads/2018/04/chickens.jpg',
    'https://assets.kpmg.com/is/image/kpmg/honeybee-on-flower-banner:cq5dam.web.2000.500',
    'https://world-odyssey.com/wp-content/uploads/2016/07/tanzania-lion-2000x500.jpg',
    'https://a.storyblok.com/f/108167/2000x500/8f45fe6622/337c0faf-e5ce-4bc9-a2ab-4a386e1c2bff.jpg',
    'https://images.squarespace-cdn.com/content/v1/59ed35286957da4fe1b0d2be/1643395231711-2P24J26XPG2425MAGOUM/slice+1.jpg?format=2500w',
    'https://fishtightlines.com/wp-content/uploads/2013/05/ftl_big_banner_salmon.jpg',
    'https://www.nhnature.org/assets/images/mastheads/Loon-IMG_8231.jpg',
    'https://lynbrookvet.com.au/wp-content/webp-express/webp-images/uploads/2017/11/resources_Banner-Image-Handouts-copy_preview.jpg.webp',
    'https://raesafaris.co.za/wp-content/uploads/2018/10/Tanzania-banner-1.jpg',
    'https://www.pollywogspets.com/image/125516571.jpg',
    'https://i0.wp.com/www.chasingbugs.com/wp-content/uploads/2021/05/Plant-Native-Banner.jpg?w=2000&ssl=1',
    'https://images-us-prod.cms.commerce.dynamics.com/cms/api/mhtmhnbtbn/imageFileData/MC2Btj?ver=5996&w=2000&h=500&q=80&m=8&x=0&y=702&s=3825&d=956&f=jpg&b=%23F1EEE9',
    'https://a.storyblok.com/f/108167/2000x500/0108296c61/87bc9d3f-7d1b-e14e-9de0-844be4024a9a.jpg'
];

const About: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Head>
                <title>About Us</title>
                <meta name="description" content="Learn more about our wildlife education platform." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <ImageSlider images={images} />
            <div className="container mx-auto mt-8 p-4">
                <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>
                <p className="text-lg mb-4">
                    At Atlas, our mission is to inspire a deep appreciation for wildlife
                    and the environment through innovative and engaging educational experiences. We believe that everyone
                    has a role to play in conserving our planet’s biodiversity, and we strive to empower individuals with
                    the knowledge and skills they need to make a difference.
                </p>
                <p className="text-lg mb-4">
                    We envision a world where people of all ages are connected to nature and actively participate in
                    wildlife conservation efforts. By providing accessible, interactive, and culturally relevant educational
                    resources, we aim to foster a generation of informed advocates who are passionate about protecting our
                    planet’s precious ecosystems.
                </p>
                <p className="text-lg mb-4">
                    Atlas is a dedicated team of educators, conservationists, scientists,
                    and tech enthusiasts who are passionate about wildlife and environmental education. We come from diverse
                    backgrounds, united by a common goal: to create an engaging online platform that makes learning about
                    wildlife fun, accessible, and impactful.
                </p>
                <p className="text-lg mb-4">
                    Our platform provides a wide range of resources and tools designed to enhance wildlife education,
                    including interactive learning modules, educational games, mindfulness practices, and community forums.
                    We invite you to join us on this exciting journey toward wildlife conservation and education.
                </p>
                <p className="text-lg mb-4">
                    Together, we can create a brighter future for wildlife and the ecosystems they inhabit.
                </p>
                <div className="flex justify-center mt-4">
                    <img src="/logo.png" alt="Wildlife Logo" />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
