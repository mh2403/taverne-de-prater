import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/sfeer")({
  component: SfeerPage,
});

const photos = [
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s33a68ffd396e4903/image/i5142f264b65a9d21/version/1471980848/image.jpg",
    alt: "Sfeerfoto De Prater 1",
  },
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s33a68ffd396e4903/image/i2da0bc0aae2a5af4/version/1471980848/image.jpg",
    alt: "Sfeerfoto De Prater 2",
  },
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s33a68ffd396e4903/image/ib2f4c1c2013ebf8d/version/1471980848/image.jpg",
    alt: "Sfeerfoto De Prater 3",
  },
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s33a68ffd396e4903/image/i8de86b6f1e09682e/version/1471980848/image.jpg",
    alt: "Sfeerfoto De Prater 4",
  },
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s33a68ffd396e4903/image/i02d5c4f5c4040907/version/1471980848/image.jpg",
    alt: "Sfeerfoto De Prater 5",
  },
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s33a68ffd396e4903/image/iccf3f21fa584766e/version/1471980848/image.jpg",
    alt: "Sfeerfoto De Prater 6",
  },
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s33a68ffd396e4903/image/ib4b3b049437a107e/version/1471980848/image.jpg",
    alt: "Sfeerfoto De Prater 7",
  },
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s33a68ffd396e4903/image/ibfb2622e99d0df71/version/1471980848/image.jpg",
    alt: "Sfeerfoto De Prater 8",
  },
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s33a68ffd396e4903/image/i10410f03be13da93/version/1471980848/image.jpg",
    alt: "Sfeerfoto De Prater 9",
  },
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s33a68ffd396e4903/image/i911e99875e829cf3/version/1471980848/image.jpg",
    alt: "Sfeerfoto De Prater 10",
  },
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s33a68ffd396e4903/image/idbb12e9230ccde30/version/1471980848/image.jpg",
    alt: "Sfeerfoto De Prater 11",
  },
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s33a68ffd396e4903/image/i245f70fe4a75badb/version/1471980848/image.jpg",
    alt: "Sfeerfoto De Prater 12",
  },
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s33a68ffd396e4903/image/i377a5af12b403418/version/1471980848/image.jpg",
    alt: "Sfeerfoto De Prater 13",
  },
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s33a68ffd396e4903/image/if858da7588c231b8/version/1471980848/image.jpg",
    alt: "Sfeerfoto De Prater 14",
  },
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s33a68ffd396e4903/image/i10692cbaeb2324b8/version/1471980848/image.jpg",
    alt: "Sfeerfoto De Prater 15",
  },
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s33a68ffd396e4903/image/idb90919765ff86ca/version/1471980848/image.jpg",
    alt: "Sfeerfoto De Prater 16",
  },
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s33a68ffd396e4903/image/ib8e3b0b6e1fe5a12/version/1471980848/image.jpg",
    alt: "Sfeerfoto De Prater 17",
  },
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s33a68ffd396e4903/image/i71a8f1747a2217ba/version/1471980848/image.jpg",
    alt: "Sfeerfoto De Prater 18",
  },
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s33a68ffd396e4903/image/i5631771a8d5c3382/version/1471980848/image.jpg",
    alt: "Sfeerfoto De Prater 19",
  },
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s33a68ffd396e4903/image/ieea16d4e49a7526a/version/1471980848/image.jpg",
    alt: "Sfeerfoto De Prater 20",
  },
];

function SfeerPage() {
  const { data } = useSiteContent();

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 pt-16 md:px-6 md:pt-24">
        <p className="text-xs uppercase tracking-[0.25em] text-primary/70">Een blik binnen</p>
        <h1 className="mt-2 font-serif text-4xl text-primary sm:text-5xl">
          {data.copy.sfeerTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-foreground/75">{data.copy.sfeerIntro}</p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="columns-1 gap-3 sm:columns-2 lg:columns-3 [&>*]:mb-3">
          {photos.map((p, i) => (
            <img
              key={i}
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="w-full break-inside-avoid rounded-2xl object-cover transition hover:brightness-105"
            />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {[
            "Terras",
            "Cocktails",
            "Eten aan de bar",
            "Grote Markt",
            "Gezellig met vrienden",
            "Lunch & diner",
          ].map((b) => (
            <span
              key={b}
              className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-foreground/75"
            >
              {b}
            </span>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
