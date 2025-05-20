import { useEffect, useState } from "react";

function Even() {
  useEffect(() => {
    return () => {
      console.log("unmounting even");
    };
  }, []);

  return "Even";
}

function Parent() {
  useEffect(() => {
    return () => {
      console.log("unmounting parent");
    };
  }, []);
  return [<Even />, <Always />];
}

function Odd() {
  useEffect(() => {
    return () => {
      console.log("unmounting odd");
    };
  }, []);
  return "Odd";
}

function Always() {
  const [c, set] = useState(0);

  useEffect(() => {
    console.log("mounting Always");
    return () => {
      console.log("unmounting Always");
    };
  }, []);
  return ["Always", c, <button onClick={() => set(10)}>incr</button>];
}

function LCTest2(params) {
  const [c, setc] = useState(0);

  useEffect(() => {
    return () => {
      console.log("unmounting LCTest");
    };
  }, []);

  const t = (
    <div>
      <h1>R Lifeccyle Test</h1>
      <div>{c % 2 === 0 ? <Parent /> : null}</div>
      <button
        onClick={() => {
          setc((c) => c + 1);
        }}
      >
        click
      </button>
      <Always />
      {/* {[1, 2, 4].map((_, i) => {
        return c % 2 === 0 ? <Always key={"k" + i} /> : null;
      })} */}
    </div>
  );

  console.log(t);

  return t;
}

const Ctr = (props) => {
  const [st, set] = useState({ c: 100, version: "Loading..." });

  let timer = null;

  useEffect(() => {
    return () => {
      console.log("unmount Ctr");
      clearTimeout(timer);
    };
  });

  // console.log(props);
  return (
    <div
      style={{
        background: st.c % 2 === 0 ? "orange" : "tomato",
        color: st.c % 2 === 0 ? "white" : "unset",
        padding: "2em",
      }}
    >
      <h3>Child</h3>
      <p>
        Parent ctr: {props.v} {props.v % 2 === 0 ? "Even" : null}
      </p>
      <p>My ctr: {st.c}</p>
      <p>Json Value: {st.version}</p>
      <button
        onClick={(e) => {
          // setcc(cc() + 1);
          set((c) => c + 1);
        }}
      >
        click
      </button>
    </div>
  );
};

// end Ctr

const Input = () => {
  const [input, set] = useState({
    input: {
      v: "some",
      e: "",
    },
  });

  useEffect(() => {
    return () => {
      console.log("unmount Input");
    };
  });

  return (
    <div>
      {[10, 20, 30].map((it) => {
        return <p>{it}</p>;
      })}
      <input
        className="input"
        onInput={(e) => {
          // console.log(e, e.target.value);
          set({
            input: {
              v: e.target.value,
              e: e.target.value ? "" : "incorrect",
            },
          });
        }}
        value={input.input.v}
      />
      <p>{input.input.e}</p>
    </div>
  );
};

const Link = (props) => {
  const [ctr, set] = useState(0);

  useEffect(() => {
    console.log("link mounted");

    return () => {
      console.log("link UN mounted");
    };
  });

  return [
    <a
      href={props.href}
      data-navigo
      onClick={(e) => {
        e.preventDefault();
        return true;
      }}
    >
      {props.children} {ctr}
    </a>,
    <button onClick={() => set((ctr) => ctr + 1)}>click</button>,
  ];
};

export function LCTest(props) {
  console.log("rendered App", props);
  const [c, setc] = useState(0);
  const [s, sets] = useState("akshay");
  let ref = null;

  // createEffect(() => {
  //   console.log(c());
  // });

  useEffect(() => {
    console.log("mount app", ref);
  });

  const arr = [];
  for (let i = 0; i < 10; ++i) arr.push(i);

  const Number = (props) => {
    useEffect(() => {
      console.log("mounting number");
      return () => {
        console.log("unmounting number");
      };
    });

    return <li>{props.n}</li>;
  };

  const Master = () => (
    <div>
      <Ctr key={"k" + 1} v={c} />
      <Input key={"k" + 2} />
      <Ctr key={"k" + 3} v={c} />
    </div>
  );

  const t = (
    <div>
      hello world {c} {s}
      <div>
        <button
          onClick={(e) => {
            // batch(() => {
            //   setc(c() + 1);
            //   sets("akshay is smart");
            // });
            setc((c) => c + 1);
          }}
        >
          Counter
        </button>
      </div>
      {c % 2 === 0 ? <Master /> : "NA"}
      {/* {c() % 2 === 0 ? <Master /> : "NA"} */}
      {c % 2 !== 0 ? (
        <ul>
          {arr.map((n) => (
            <Number n={n} />
          ))}
        </ul>
      ) : // <Number n={10} />
      null}
      <p>
        <Link href="/route2">Go next</Link>
      </p>
    </div>
  );
  console.log(t);

  return t;
}

export default LCTest;
