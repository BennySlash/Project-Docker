import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../Navbar";
import admins from "../../utils/admin";

const QuizInstruction = () => {
  const { user } = useAuth();
  const { logout } = useAuth();

  const [isAdmin, setIsAdmin] = useState(false);
  const admin = admins.includes(user);

  return (
    <div className="relative flex justify-center">
      <div className="fixed">{admin && <Navbar />}</div>
      <div className="px-20 bg-white rounded-lg mt-16 pb-24 leading-7">
        <h1 className="text-center">Quiz Instructions</h1>
        <p className="pb-10">
          The quizzes consists of questions carefully designed to help you
          self-assess your comprehension of the information presented on the
          topics covered in the module. No data will be collected on the website
          regarding your responses or how many times you take the quiz. Each
          question in the quiz is of multiple-choice or "true or false" format.
          Read each question carefully, and click on the button next to your
          response that is based on the information covered on the topic in the
          module. Each correct or incorrect response will result in appropriate
          feedback immediately at the bottom of the screen. After responding to
          a question, click on the "Next Question" button at the bottom to go to
          the next questino. After responding to the 8th question, click on
          "Close" on the top of the window to exit the quiz. If you select an
          incorrect response for a question, you can try again until you get the
          correct response. If you retake the quiz, the questions and their
          respective responses will be randomized. The total score for the quiz
          is based on your responses to all questions. If you respond
          incorrectly to a question or retake a question again and get the
          correct response, your quiz score will reflect it appropriately.
          However, your quiz will not be graded, if you skip a question or exit
          before responding to all the questions. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam ipsam placeat ducimus mollitia
          expedita cum quam perspiciatis aut id iure laborum, ad, optio incidunt
          obcaecati, quia ipsum maxime numquam a? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Sint temporibus illum excepturi mollitia
          neque maxime ab, quis vitae odit assumenda praesentium et cumque
          perferendis nesciunt explicabo autem, voluptatem eos id officia
          voluptate. Ipsum quod consectetur ex, id voluptas ipsa. Illo, quaerat!
          Reprehenderit aperiam laboriosam corporis recusandae consectetur,
          iusto voluptas quam harum, accusantium porro, velit nihil. Aliquam
          labore repellat voluptatibus voluptatum, illum, totam modi velit
          numquam earum consectetur consequatur ipsa dignissimos eum nemo, nisi
          quaerat rem quia quisquam. Obcaecati quo provident totam iusto
          doloremque ratione consectetur esse similique aperiam quaerat neque
          laboriosam maiores soluta veniam quibusdam sed, repellendus natus cum
          expedita? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Odio ab quae assumenda similique quasi! Maxime quam obcaecati impedit
          amet deserunt, omnis libero necessitatibus quibusdam minima quisquam
          minus saepe eligendi laudantium, suscipit placeat? Architecto
          blanditiis voluptas iusto ullam quibusdam mollitia aperiam nostrum
          maxime praesentium! Reprehenderit maxime dignissimos ratione hic, fuga
          id voluptatum, amet tempore repudiandae recusandae doloremque
          laudantium voluptatibus harum magnam. Illo dolor eligendi perferendis
          reprehenderit tenetur, sit officiis explicabo quisquam in
          exercitationem? Ad dolorem natus quis cumque tempore aperiam deleniti
          explicabo illo. Assumenda eum illo sunt voluptates, minus quo,
          doloribus et expedita, molestiae necessitatibus vel. Temporibus
          possimus consequuntur vitae quisquam ratione. Nobis sint animi dolores
          commodi iure minima, quae aspernatur, laudantium ratione minus libero
          quos, odit eveniet doloribus. Nisi molestias autem dolorum ratione
          animi, itaque quia, hic provident possimus corrupti similique
          explicabo sapiente ducimus et vero, dolores praesentium commodi enim!
          Eligendi obcaecati minima veritatis nam eaque ad dolores non pariatur
          culpa debitis inventore repellat nisi, in officia, est maxime atque
          ducimus iure illo impedit provident asperiores ex at sit! Fugiat iste
          provident nesciunt id qui nemo neque. Deleniti officia repellat
          provident odio et, quasi cum at ex facilis veniam reiciendis iste ea
          eum iure ad possimus perspiciatis tenetur sint dicta! Voluptatibus id
          ea aliquid nostrum officiis minima illo modi perspiciatis, quasi error
          eius neque placeat quia voluptas aliquam laboriosam nam enim.
          Officiis, nesciunt? Aliquam similique fuga nemo consequatur aut ut
          ipsum minima quasi tempore quaerat? Dolores, mollitia minima.
          Quibusdam suscipit quidem reprehenderit nihil magni exercitationem
          dicta officiis minus cum? Nulla pariatur nemo sit sed nam accusamus
          ullam quaerat, officiis fugit quas, iste vero ea fugiat earum,
          delectus obcaecati tenetur enim tempora molestias expedita adipisci
          repudiandae repellendus voluptatibus. Nobis placeat, laboriosam
          nesciunt odio veniam consectetur officiis nemo dolores id ipsum ex sit
          perspiciatis quod voluptate alias debitis sed tempora quidem corrupti
          incidunt, culpa minima. Laborum illo modi cupiditate ipsum deserunt
          repellendus vel molestiae tempore delectus quos quis quod, corrupti,
          iste eligendi corporis neque non. Eligendi odit unde neque doloremque
          perspiciatis modi doloribus laborum dolorum maiores perferendis
          impedit inventore accusamus dignissimos reiciendis, amet distinctio
          quia ratione magnam veritatis quaerat quam explicabo sequi! Et nihil a
          doloribus? Dolores ipsam dignissimos, eius modi veniam, minima nisi
          reprehenderit libero natus aperiam fuga sed? Nobis quasi tempore
          minima quidem magnam, unde illum aliquid sequi quod sint ea voluptates
          aut neque corrupti earum eligendi commodi dolore rerum consequatur.
          Nam enim doloremque cum iure voluptatum, similique quis sit minima in
          libero animi corporis. Aperiam eius odit nulla optio! Nesciunt cumque
          beatae quam molestiae minus quod perspiciatis aliquam facere animi
          eius reiciendis omnis, magnam, obcaecati accusamus ullam possimus
          explicabo officiis autem, amet a odio? Mollitia amet voluptatem eaque
          pariatur. Rerum, ex quas fugiat beatae ea neque voluptatibus assumenda
          odit! Iusto sapiente, ipsam ad nam tenetur incidunt non quasi, iste
          illo error rem aut explicabo itaque consequuntur cum quas saepe. Nisi
          soluta nihil aliquid deleniti! Incidunt omnis aliquid alias placeat
          possimus corrupti sapiente quis nam, odio accusantium dicta
          exercitationem! Odit amet commodi fugiat, veniam illum nemo quam in
          iusto repellendus. Aperiam aliquid inventore eveniet aut harum quas
          expedita dolor asperiores necessitatibus natus. Iste nulla tempore id
          illo veniam delectus reprehenderit adipisci blanditiis fugiat
          recusandae repellat cupiditate porro eligendi, voluptas placeat, odit
          unde esse excepturi aliquam? Laboriosam consequatur magnam illo
          provident consectetur nisi corrupti corporis iure placeat dolore
          doloremque eos temporibus est blanditiis debitis, beatae porro,
          architecto consequuntur. Eligendi sequi laborum voluptates eum
          laudantium dolorum! Rerum eos soluta nemo ipsum molestias saepe minima
          voluptatem esse at ea fuga laborum a, eaque tempore cum inventore
          maxime quod cumque doloribus perspiciatis dolorum impedit molestiae
          quas. Quibusdam sit magni totam architecto? Libero aperiam quae quo
          repellendus maxime ab eaque, aspernatur tenetur totam obcaecati saepe
          voluptatum harum laudantium enim qui culpa ad earum suscipit alias
          tempore molestiae veritatis dolore! Odit quasi minima totam quibusdam
          necessitatibus quas rerum vitae, in ad, autem impedit cum commodi,
          perspiciatis nam ut. Maiores quae tenetur deleniti, odit quasi
          recusandae qui iste dicta numquam doloremque, autem ipsa iure
          quibusdam! Tempora molestiae vel eos. Nihil, inventore nobis.
          Architecto nulla sequi libero maxime praesentium quam assumenda,
          exercitationem, ducimus laboriosam ipsum, excepturi ipsam nisi ut
          soluta adipisci? Unde minima atque perspiciatis blanditiis porro a,
          sint animi cumque, accusantium laborum voluptas quia exercitationem
          ex. Mollitia, dolorem ea? Corporis sit, reprehenderit ut ducimus
          delectus nisi ex, quasi optio praesentium dolore nihil reiciendis
          explicabo magnam autem excepturi inventore, dolorum perferendis.
          Officia eligendi consectetur odio, fugiat provident atque
          exercitationem ut totam laboriosam repellat sint asperiores maxime
          omnis ullam libero quidem qui nam reprehenderit mollitia? Totam
          incidunt adipisci libero quos cumque, rerum tempore esse voluptatem
          non omnis sunt dignissimos nihil deserunt nesciunt minima? Atque amet
          totam tempora fugiat? Omnis nihil vitae vel facilis dolorum at
          excepturi veniam fugiat doloremque illo ratione laboriosam maiores ab
          nemo non, dolore dolor quis animi odit officia, delectus repellendus
          obcaecati veritatis? Consequatur commodi voluptate reprehenderit
          officia iste provident blanditiis perferendis facilis minus itaque
          doloribus, rem facere, ad officiis quia! Architecto debitis accusamus
          dicta quos explicabo expedita atque accusantium? Tenetur aspernatur
          beatae enim in iste sunt, rerum dolor saepe quos molestias ex
          voluptatem adipisci omnis soluta ad cupiditate veniam eligendi
          distinctio quidem, asperiores harum, similique assumenda consequuntur
          tempora? Fugiat excepturi consequuntur reprehenderit pariatur
          doloribus numquam, reiciendis quod, cupiditate blanditiis dignissimos
          quibusdam illum provident vitae quae ut quia sequi eos. Explicabo,
          minus aperiam, ducimus voluptatibus est eius rerum sunt nam sint natus
          autem commodi. Doloribus deserunt error natus iure neque libero esse
          saepe, voluptatem unde quae dignissimos obcaecati possimus assumenda?
          Fuga culpa nihil vitae dolorem laudantium sint accusantium? Omnis ipsa
          iusto illo quos unde rerum eius fugiat, exercitationem error
          recusandae reprehenderit aperiam velit alias facilis, officiis harum
          eveniet at, veniam doloribus qui porro illum consequatur. Dicta
          nostrum praesentium provident possimus pariatur? Dolorem quis illo
          facilis necessitatibus mollitia corrupti eum repellat ab dolor veniam
          possimus laboriosam beatae at nam, doloremque numquam dolore nobis
          provident dicta temporibus labore? Mollitia molestias eaque animi
          temporibus earum totam repudiandae doloribus suscipit, consectetur
          quae, repellat, illo est similique. Provident cupiditate voluptas
          repellat nemo ut doloribus facilis, explicabo adipisci nam voluptatum
          laboriosam repudiandae!
        </p>
        <div className="mt-10 flex justify-center gap-x-80">
          <Link
            className="w-1/12 text-center p-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            to="/play-quiz"
            state={{ name: user }}
          >
            Take Quiz
          </Link>
          <button
            onClick={logout}
            className="w-1/12 text-center p-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizInstruction;
