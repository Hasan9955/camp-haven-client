

const Title = ({ title, subtitle }: { title: string; subtitle: string }) => {
    return (
        <div className="lg:w-5/12 mx-auto text-center my-8">
            <h3 className="text-blue-500 mb-2 text-sm md:text-md">{subtitle}</h3>
            <h1 className="text-2xl md:text-3xl lg:text-4xl border-y-2 py-3">{title}</h1>
        </div>
    );
};

export default Title;