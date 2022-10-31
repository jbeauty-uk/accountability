import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { CommonProviderOptions } from "next-auth/providers";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";

type Props = {
  providers: CommonProviderOptions[];
} & GetServerSidePropsContext;

const SignIn = ({ providers }: Props) => {
  const { query } = useRouter();

  const callbackUrl =
    typeof query.callbackUrl == "string" ? query.callbackUrl : "/";

  const signInOptions = {
    callbackUrl,
  };

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl">Sign in</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="border rounded-md p-4">
          <button onClick={() => signIn(provider.id, signInOptions)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      providers: await getProviders(),
    },
  };
};

export default SignIn;
