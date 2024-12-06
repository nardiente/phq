type TestimonialProps = {
  name: string;
  role: string;
  feedback: string;
};

export const Testimonial: React.FC<TestimonialProps> = ({
  name,
  role,
  feedback,
}) => {
  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm">
      <p className="text-lg font-semibold">{name}</p>
      <p className="text-sm text-gray-500">{role}</p>
      <p className="text-sm mt-3">{feedback}</p>
      <div className="mt-3 text-yellow-500">★★★★★</div>
    </div>
  );
};
