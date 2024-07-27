import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container, Loader } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true)
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            setLoading(true)
            appwriteService.getPost(slug).then((post) => {
                setLoading(false)
                if (post) {
                    setPost(post);
                }


                else navigate("/");
            });
        } else navigate("/");
    },
        [slug, navigate]
    );

    const deletePost = () => {
        setLoading(true)
        appwriteService.deletePost(post.$id).then((status) => {
            setLoading(false)
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                toast.success("Deleted successfully",{
                    position:"top-left",
                    autoClose:2000
                })
                navigate("/all-posts");
            }
        });
    };

    return loading ? (<Loader className='mt-4 mb-4' />) : post ? (
        <div className="py-8">
            <Container>

                <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
                    <Link to={'/all-posts'}>
                        <Button bgColor="bg-blue-500" className="text-white m-5 absolute">
                            All Post
                        </Button>
                    </Link>
                    {isAuthor && (
                        <div className=" absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl bg-slate-100"

                    />

                </div>
                <div className="w-full mb-2">
                    <h1 className="text-3xl font-bold">{post.title}</h1>

                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null
}