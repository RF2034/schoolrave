import Link from "next/link";

const ConceptSection = () => (
  <section className="py-12 md:py-16 lg:py-20 px-4 bg-base-100">
    <div className="container mx-auto max-w-4xl">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">
        what is ガッコウレイヴ?
      </h2>
      <div className="space-y-8 md:space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="card bg-base-200">
            <figure>
              <img
                src="https://images.schoolrave.net/cdn-cgi/image/f=webp/DSC_0447.webp"
                alt="DJフロアの様子"
              />
            </figure>
            <div className="card-body text-center">
              <h3 className="card-title justify-center text-lg mb-2">🎵 複数のDJフロア</h3>
              <p>様々なジャンルの音楽を楽しめます</p>
            </div>
          </div>
          <div className="card bg-base-200">
            <figure>
              <img
                src="https://images.schoolrave.net/cdn-cgi/image/f=webp/DSC_0207.webp"
                alt="フード & ドリンクの様子"
              />
            </figure>
            <div className="card-body text-center">
              <h3 className="card-title justify-center text-lg mb-2">🍕 フード & ドリンク</h3>
              <p>美味しい料理とドリンクをご用意</p>
            </div>
          </div>
          <div className="card bg-base-200">
            <figure>
              <img
                src="https://images.schoolrave.net/cdn-cgi/image/f=webp/DSC_0094.webp"
                alt="コーヒースタンドの様子"
              />
            </figure>
            <div className="card-body text-center">
              <h3 className="card-title justify-center text-lg mb-2">☕ 参加者企画</h3>
              <p>
                コーヒースタンド
                <br />
                キャンプファイヤーetc...
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 flex justify-center">
        <Link href="/2025/about" className="btn btn-outline btn-lg">概要を見る</Link>
      </div>
    </div>
  </section>
);

export default ConceptSection;
