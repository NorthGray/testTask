"use strict";
(self.webpackChunktest_task =
  self.webpackChunktest_task || []).push([
  [179],
  {
    863: () => {
      function te(e) {
        return "function" == typeof e;
      }
      function qr(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const ui = qr(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function Kr(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class it {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (te(r))
              try {
                r();
              } catch (i) {
                t = i instanceof ui ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  md(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof ui ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new ui(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) md(t);
            else {
              if (t instanceof it) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && Kr(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && Kr(n, t), t instanceof it && t._removeParent(this);
        }
      }
      it.EMPTY = (() => {
        const e = new it();
        return (e.closed = !0), e;
      })();
      const pd = it.EMPTY;
      function gd(e) {
        return (
          e instanceof it ||
          (e && "closed" in e && te(e.remove) && te(e.add) && te(e.unsubscribe))
        );
      }
      function md(e) {
        te(e) ? e() : e.unsubscribe();
      }
      const In = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        li = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = li;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = li;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function yd(e) {
        li.setTimeout(() => {
          const { onUnhandledError: t } = In;
          if (!t) throw e;
          t(e);
        });
      }
      function vd() {}
      const OD = fa("C", void 0, void 0);
      function fa(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let Sn = null;
      function ci(e) {
        if (In.useDeprecatedSynchronousErrorHandling) {
          const t = !Sn;
          if ((t && (Sn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = Sn;
            if (((Sn = null), n)) throw r;
          }
        } else e();
      }
      class ha extends it {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), gd(t) && t.add(this))
              : (this.destination = BD);
        }
        static create(t, n, r) {
          return new Zr(t, n, r);
        }
        next(t) {
          this.isStopped
            ? ga(
                (function kD(e) {
                  return fa("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? ga(
                (function FD(e) {
                  return fa("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? ga(OD, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const jD = Function.prototype.bind;
      function pa(e, t) {
        return jD.call(e, t);
      }
      class VD {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              di(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              di(r);
            }
          else di(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              di(n);
            }
        }
      }
      class Zr extends ha {
        constructor(t, n, r) {
          let o;
          if ((super(), te(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && In.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && pa(t.next, i),
                  error: t.error && pa(t.error, i),
                  complete: t.complete && pa(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new VD(o);
        }
      }
      function di(e) {
        In.useDeprecatedSynchronousErrorHandling
          ? (function LD(e) {
              In.useDeprecatedSynchronousErrorHandling &&
                Sn &&
                ((Sn.errorThrown = !0), (Sn.error = e));
            })(e)
          : yd(e);
      }
      function ga(e, t) {
        const { onStoppedNotification: n } = In;
        n && li.setTimeout(() => n(e, t));
      }
      const BD = {
          closed: !0,
          next: vd,
          error: function $D(e) {
            throw e;
          },
          complete: vd,
        },
        ma =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Mn(e) {
        return e;
      }
      function Dd(e) {
        return 0 === e.length
          ? Mn
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, o) => o(r), n);
            };
      }
      let ye = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function zD(e) {
              return (
                (e && e instanceof ha) ||
                ((function UD(e) {
                  return e && te(e.next) && te(e.error) && te(e.complete);
                })(e) &&
                  gd(e))
              );
            })(n)
              ? n
              : new Zr(n, r, o);
            return (
              ci(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = wd(r))((o, i) => {
              const s = new Zr({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [ma]() {
            return this;
          }
          pipe(...n) {
            return Dd(n)(this);
          }
          toPromise(n) {
            return new (n = wd(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function wd(e) {
        var t;
        return null !== (t = e ?? In.Promise) && void 0 !== t ? t : Promise;
      }
      const GD = qr(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let At = (() => {
        class e extends ye {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new Cd(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new GD();
          }
          next(n) {
            ci(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            ci(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            ci(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? pd
              : ((this.currentObservers = null),
                i.push(n),
                new it(() => {
                  (this.currentObservers = null), Kr(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new ye();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new Cd(t, n)), e;
      })();
      class Cd extends At {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : pd;
        }
      }
      function _d(e) {
        return te(e?.lift);
      }
      function Ee(e) {
        return (t) => {
          if (_d(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Ie(e, t, n, r, o) {
        return new WD(e, t, n, r, o);
      }
      class WD extends ha {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function G(e, t) {
        return Ee((n, r) => {
          let o = 0;
          n.subscribe(
            Ie(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function Tn(e) {
        return this instanceof Tn ? ((this.v = e), this) : new Tn(e);
      }
      function ZD(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var o,
          r = n.apply(e, t || []),
          i = [];
        return (
          (o = {}),
          s("next"),
          s("throw"),
          s("return"),
          (o[Symbol.asyncIterator] = function () {
            return this;
          }),
          o
        );
        function s(f) {
          r[f] &&
            (o[f] = function (h) {
              return new Promise(function (p, g) {
                i.push([f, h, p, g]) > 1 || a(f, h);
              });
            });
        }
        function a(f, h) {
          try {
            !(function u(f) {
              f.value instanceof Tn
                ? Promise.resolve(f.value.v).then(l, c)
                : d(i[0][2], f);
            })(r[f](h));
          } catch (p) {
            d(i[0][3], p);
          }
        }
        function l(f) {
          a("next", f);
        }
        function c(f) {
          a("throw", f);
        }
        function d(f, h) {
          f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
        }
      }
      function QD(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function Id(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    i({ value: l, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      const Sd = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function Md(e) {
        return te(e?.then);
      }
      function Td(e) {
        return te(e[ma]);
      }
      function Ad(e) {
        return Symbol.asyncIterator && te(e?.[Symbol.asyncIterator]);
      }
      function Rd(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const xd = (function JD() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Nd(e) {
        return te(e?.[xd]);
      }
      function Pd(e) {
        return ZD(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield Tn(n.read());
              if (o) return yield Tn(void 0);
              yield yield Tn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Od(e) {
        return te(e?.getReader);
      }
      function Rt(e) {
        if (e instanceof ye) return e;
        if (null != e) {
          if (Td(e))
            return (function XD(e) {
              return new ye((t) => {
                const n = e[ma]();
                if (te(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Sd(e))
            return (function ew(e) {
              return new ye((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (Md(e))
            return (function tw(e) {
              return new ye((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, yd);
              });
            })(e);
          if (Ad(e)) return Fd(e);
          if (Nd(e))
            return (function nw(e) {
              return new ye((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Od(e))
            return (function rw(e) {
              return Fd(Pd(e));
            })(e);
        }
        throw Rd(e);
      }
      function Fd(e) {
        return new ye((t) => {
          (function ow(e, t) {
            var n, r, o, i;
            return (function qD(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    l(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  try {
                    l(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, u);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = QD(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function $t(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Me(e, t, n = 1 / 0) {
        return te(t)
          ? Me((r, o) => G((i, s) => t(r, i, o, s))(Rt(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            Ee((r, o) =>
              (function iw(e, t, n, r, o, i, s, a) {
                const u = [];
                let l = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !l && t.complete();
                  },
                  h = (g) => (l < r ? p(g) : u.push(g)),
                  p = (g) => {
                    i && t.next(g), l++;
                    let y = !1;
                    Rt(n(g, c++)).subscribe(
                      Ie(
                        t,
                        (D) => {
                          o?.(D), i ? h(D) : t.next(D);
                        },
                        () => {
                          y = !0;
                        },
                        void 0,
                        () => {
                          if (y)
                            try {
                              for (l--; u.length && l < r; ) {
                                const D = u.shift();
                                s ? $t(t, s, () => p(D)) : p(D);
                              }
                              f();
                            } catch (D) {
                              t.error(D);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Ie(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      function Qn(e = 1 / 0) {
        return Me(Mn, e);
      }
      const Bt = new ye((e) => e.complete());
      function va(e) {
        return e[e.length - 1];
      }
      function Qr(e) {
        return (function aw(e) {
          return e && te(e.schedule);
        })(va(e))
          ? e.pop()
          : void 0;
      }
      function kd(e, t = 0) {
        return Ee((n, r) => {
          n.subscribe(
            Ie(
              r,
              (o) => $t(r, e, () => r.next(o), t),
              () => $t(r, e, () => r.complete(), t),
              (o) => $t(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function Ld(e, t = 0) {
        return Ee((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function jd(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new ye((n) => {
          $t(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            $t(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function ve(e, t) {
        return t
          ? (function gw(e, t) {
              if (null != e) {
                if (Td(e))
                  return (function cw(e, t) {
                    return Rt(e).pipe(Ld(t), kd(t));
                  })(e, t);
                if (Sd(e))
                  return (function fw(e, t) {
                    return new ye((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (Md(e))
                  return (function dw(e, t) {
                    return Rt(e).pipe(Ld(t), kd(t));
                  })(e, t);
                if (Ad(e)) return jd(e, t);
                if (Nd(e))
                  return (function hw(e, t) {
                    return new ye((n) => {
                      let r;
                      return (
                        $t(n, t, () => {
                          (r = e[xd]()),
                            $t(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => te(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (Od(e))
                  return (function pw(e, t) {
                    return jd(Pd(e), t);
                  })(e, t);
              }
              throw Rd(e);
            })(e, t)
          : Rt(e);
      }
      function Da(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new Zr({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return t(...n).subscribe(r);
      }
      function J(e) {
        for (let t in e) if (e[t] === J) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function X(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(X).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function Ca(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const vw = J({ __forward_ref__: J });
      function _a(e) {
        return (
          (e.__forward_ref__ = _a),
          (e.toString = function () {
            return X(this());
          }),
          e
        );
      }
      function x(e) {
        return (function ba(e) {
          return (
            "function" == typeof e &&
            e.hasOwnProperty(vw) &&
            e.__forward_ref__ === _a
          );
        })(e)
          ? e()
          : e;
      }
      class b extends Error {
        constructor(t, n) {
          super(
            (function fi(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function O(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function hi(e, t) {
        throw new b(-201, !1);
      }
      function Je(e, t) {
        null == e &&
          (function K(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function L(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function sn(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function pi(e) {
        return Vd(e, gi) || Vd(e, Bd);
      }
      function Vd(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function $d(e) {
        return e && (e.hasOwnProperty(Ea) || e.hasOwnProperty(Mw))
          ? e[Ea]
          : null;
      }
      const gi = J({ ɵprov: J }),
        Ea = J({ ɵinj: J }),
        Bd = J({ ngInjectableDef: J }),
        Mw = J({ ngInjectorDef: J });
      var A = (() => (
        ((A = A || {})[(A.Default = 0)] = "Default"),
        (A[(A.Host = 1)] = "Host"),
        (A[(A.Self = 2)] = "Self"),
        (A[(A.SkipSelf = 4)] = "SkipSelf"),
        (A[(A.Optional = 8)] = "Optional"),
        A
      ))();
      let Ia;
      function st(e) {
        const t = Ia;
        return (Ia = e), t;
      }
      function Hd(e, t, n) {
        const r = pi(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & A.Optional
          ? null
          : void 0 !== t
          ? t
          : void hi(X(e));
      }
      function an(e) {
        return { toString: e }.toString();
      }
      var pt = (() => (
          ((pt = pt || {})[(pt.OnPush = 0)] = "OnPush"),
          (pt[(pt.Default = 1)] = "Default"),
          pt
        ))(),
        xt = (() => {
          return (
            ((e = xt || (xt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            xt
          );
          var e;
        })();
      const ee = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        Yn = {},
        q = [],
        mi = J({ ɵcmp: J }),
        Sa = J({ ɵdir: J }),
        Ma = J({ ɵpipe: J }),
        Ud = J({ ɵmod: J }),
        Ut = J({ ɵfac: J }),
        Yr = J({ __NG_ELEMENT_ID__: J });
      let Aw = 0;
      function Jn(e) {
        return an(() => {
          const n = !0 === e.standalone,
            r = {},
            o = {
              type: e.type,
              providersResolver: null,
              decls: e.decls,
              vars: e.vars,
              factory: null,
              template: e.template || null,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              hostBindings: e.hostBindings || null,
              hostVars: e.hostVars || 0,
              hostAttrs: e.hostAttrs || null,
              contentQueries: e.contentQueries || null,
              declaredInputs: r,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === pt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              standalone: n,
              dependencies: (n && e.dependencies) || null,
              getStandaloneInjector: null,
              selectors: e.selectors || q,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || xt.Emulated,
              id: "c" + Aw++,
              styles: e.styles || q,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
            },
            i = e.dependencies,
            s = e.features;
          return (
            (o.inputs = Wd(e.inputs, r)),
            (o.outputs = Wd(e.outputs)),
            s && s.forEach((a) => a(o)),
            (o.directiveDefs = i
              ? () => ("function" == typeof i ? i() : i).map(zd).filter(Gd)
              : null),
            (o.pipeDefs = i
              ? () => ("function" == typeof i ? i() : i).map(Ve).filter(Gd)
              : null),
            o
          );
        });
      }
      function zd(e) {
        return Z(e) || je(e);
      }
      function Gd(e) {
        return null !== e;
      }
      function An(e) {
        return an(() => ({
          type: e.type,
          bootstrap: e.bootstrap || q,
          declarations: e.declarations || q,
          imports: e.imports || q,
          exports: e.exports || q,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Wd(e, t) {
        if (null == e) return Yn;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      const xe = Jn;
      function Z(e) {
        return e[mi] || null;
      }
      function je(e) {
        return e[Sa] || null;
      }
      function Ve(e) {
        return e[Ma] || null;
      }
      function Xe(e, t) {
        const n = e[Ud] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${X(e)} does not have '\u0275mod' property.`);
        return n;
      }
      const V = 11;
      function qe(e) {
        return Array.isArray(e) && "object" == typeof e[1];
      }
      function mt(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function Ra(e) {
        return 0 != (8 & e.flags);
      }
      function wi(e) {
        return 2 == (2 & e.flags);
      }
      function Ci(e) {
        return 1 == (1 & e.flags);
      }
      function yt(e) {
        return null !== e.template;
      }
      function Fw(e) {
        return 0 != (256 & e[2]);
      }
      function On(e, t) {
        return e.hasOwnProperty(Ut) ? e[Ut] : null;
      }
      class jw {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Fn() {
        return Zd;
      }
      function Zd(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = $w), Vw;
      }
      function Vw() {
        const e = Yd(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === Yn) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function $w(e, t, n, r) {
        const o =
            Yd(e) ||
            (function Bw(e, t) {
              return (e[Qd] = t);
            })(e, { previous: Yn, current: null }),
          i = o.current || (o.current = {}),
          s = o.previous,
          a = this.declaredInputs[n],
          u = s[a];
        (i[a] = new jw(u && u.currentValue, t, s === Yn)), (e[r] = t);
      }
      Fn.ngInherit = !0;
      const Qd = "__ngSimpleChanges__";
      function Yd(e) {
        return e[Qd] || null;
      }
      function he(e) {
        for (; Array.isArray(e); ) e = e[0];
        return e;
      }
      function _i(e, t) {
        return he(t[e]);
      }
      function lt(e, t) {
        return he(t[e.index]);
      }
      function Fa(e, t) {
        return e.data[t];
      }
      function tt(e, t) {
        const n = t[e];
        return qe(n) ? n : n[0];
      }
      function bi(e) {
        return 64 == (64 & e[2]);
      }
      function un(e, t) {
        return null == t ? null : e[t];
      }
      function Jd(e) {
        e[18] = 0;
      }
      function ka(e, t) {
        e[5] += t;
        let n = e,
          r = e[3];
        for (
          ;
          null !== r && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (r[5] += t), (n = r), (r = r[3]);
      }
      const N = { lFrame: cf(null), bindingsEnabled: !0 };
      function ef() {
        return N.bindingsEnabled;
      }
      function v() {
        return N.lFrame.lView;
      }
      function U() {
        return N.lFrame.tView;
      }
      function De() {
        let e = tf();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function tf() {
        return N.lFrame.currentTNode;
      }
      function Nt(e, t) {
        const n = N.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function La() {
        return N.lFrame.isParent;
      }
      function ja() {
        N.lFrame.isParent = !1;
      }
      function or() {
        return N.lFrame.bindingIndex++;
      }
      function oC(e, t) {
        const n = N.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), Va(t);
      }
      function Va(e) {
        N.lFrame.currentDirectiveIndex = e;
      }
      function Ba(e) {
        N.lFrame.currentQueryIndex = e;
      }
      function sC(e) {
        const t = e[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
      }
      function uf(e, t, n) {
        if (n & A.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & A.Host ||
              ((o = sC(i)), null === o || ((i = i[15]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (N.lFrame = lf());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function Ha(e) {
        const t = lf(),
          n = e[1];
        (N.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function lf() {
        const e = N.lFrame,
          t = null === e ? null : e.child;
        return null === t ? cf(e) : t;
      }
      function cf(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function df() {
        const e = N.lFrame;
        return (
          (N.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const ff = df;
      function Ua() {
        const e = df();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Be() {
        return N.lFrame.selectedIndex;
      }
      function ln(e) {
        N.lFrame.selectedIndex = e;
      }
      function le() {
        const e = N.lFrame;
        return Fa(e.tView, e.selectedIndex);
      }
      function Ei(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
            u && (e.viewHooks || (e.viewHooks = [])).push(-n, u),
            l &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, l),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, l)),
            null != c && (e.destroyHooks || (e.destroyHooks = [])).push(n, c);
        }
      }
      function Ii(e, t, n) {
        hf(e, t, 3, n);
      }
      function Si(e, t, n, r) {
        (3 & e[2]) === n && hf(e, t, n, r);
      }
      function za(e, t) {
        let n = e[2];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
      }
      function hf(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[18] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[18] += 65536),
              (a < i || -1 == i) &&
                (gC(e, n, t, u), (e[18] = (4294901760 & e[18]) + u + 2)),
              u++;
      }
      function gC(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
            e[2] += 2048;
            try {
              i.call(a);
            } finally {
            }
          }
        } else
          try {
            i.call(a);
          } finally {
          }
      }
      class ro {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Mi(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            gf(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function pf(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function gf(e) {
        return 64 === e.charCodeAt(0);
      }
      function Ti(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  mf(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function mf(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function yf(e) {
        return -1 !== e;
      }
      function ir(e) {
        return 32767 & e;
      }
      function sr(e, t) {
        let n = (function wC(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let Wa = !0;
      function Ai(e) {
        const t = Wa;
        return (Wa = e), t;
      }
      let CC = 0;
      const Pt = {};
      function io(e, t) {
        const n = Ka(e, t);
        if (-1 !== n) return n;
        const r = t[1];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          qa(r.data, e),
          qa(t, null),
          qa(r.blueprint, null));
        const o = Ri(e, t),
          i = e.injectorIndex;
        if (yf(o)) {
          const s = ir(o),
            a = sr(o, t),
            u = a[1].data;
          for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | u[s + l];
        }
        return (t[i + 8] = o), i;
      }
      function qa(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Ka(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Ri(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = Sf(o)), null === r)) return -1;
          if ((n++, (o = o[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return -1;
      }
      function xi(e, t, n) {
        !(function _C(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Yr) && (r = n[Yr]),
            null == r && (r = n[Yr] = CC++);
          const o = 255 & r;
          t.data[e + (o >> 5)] |= 1 << o;
        })(e, t, n);
      }
      function wf(e, t, n) {
        if (n & A.Optional || void 0 !== e) return e;
        hi();
      }
      function Cf(e, t, n, r) {
        if (
          (n & A.Optional && void 0 === r && (r = null),
          0 == (n & (A.Self | A.Host)))
        ) {
          const o = e[9],
            i = st(void 0);
          try {
            return o ? o.get(t, r, n & A.Optional) : Hd(t, r, n & A.Optional);
          } finally {
            st(i);
          }
        }
        return wf(r, 0, n);
      }
      function _f(e, t, n, r = A.Default, o) {
        if (null !== e) {
          if (1024 & t[2]) {
            const s = (function TC(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 1024 & s[2] && !(256 & s[2]);

              ) {
                const a = bf(i, s, n, r | A.Self, Pt);
                if (a !== Pt) return a;
                let u = i.parent;
                if (!u) {
                  const l = s[21];
                  if (l) {
                    const c = l.get(n, Pt, r);
                    if (c !== Pt) return c;
                  }
                  (u = Sf(s)), (s = s[15]);
                }
                i = u;
              }
              return o;
            })(e, t, n, r, Pt);
            if (s !== Pt) return s;
          }
          const i = bf(e, t, n, r, Pt);
          if (i !== Pt) return i;
        }
        return Cf(t, n, r, o);
      }
      function bf(e, t, n, r, o) {
        const i = (function IC(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(Yr) ? e[Yr] : void 0;
          return "number" == typeof t ? (t >= 0 ? 255 & t : SC) : t;
        })(n);
        if ("function" == typeof i) {
          if (!uf(t, e, r)) return r & A.Host ? wf(o, 0, r) : Cf(t, n, r, o);
          try {
            const s = i(r);
            if (null != s || r & A.Optional) return s;
            hi();
          } finally {
            ff();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = Ka(e, t),
            u = -1,
            l = r & A.Host ? t[16][6] : null;
          for (
            (-1 === a || r & A.SkipSelf) &&
            ((u = -1 === a ? Ri(e, t) : t[a + 8]),
            -1 !== u && If(r, !1)
              ? ((s = t[1]), (a = ir(u)), (t = sr(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[1];
            if (Ef(i, a, c.data)) {
              const d = EC(a, t, n, s, r, l);
              if (d !== Pt) return d;
            }
            (u = t[a + 8]),
              -1 !== u && If(r, t[1].data[a + 8] === l) && Ef(i, a, t)
                ? ((s = c), (a = ir(u)), (t = sr(u, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function EC(e, t, n, r, o, i) {
        const s = t[1],
          a = s.data[e + 8],
          c = (function Ni(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              u = e.directiveStart,
              c = i >> 20,
              f = o ? a + c : e.directiveEnd;
            for (let h = r ? a : a + c; h < f; h++) {
              const p = s[h];
              if ((h < u && n === p) || (h >= u && p.type === n)) return h;
            }
            if (o) {
              const h = s[u];
              if (h && yt(h) && h.type === n) return u;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? wi(a) && Wa : r != s && 0 != (3 & a.type),
            o & A.Host && i === a
          );
        return null !== c ? so(t, s, c, a) : Pt;
      }
      function so(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function mC(e) {
            return e instanceof ro;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function Dw(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new b(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function W(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : O(e);
              })(i[n])
            );
          const a = Ai(s.canSeeViewProviders);
          s.resolving = !0;
          const u = s.injectImpl ? st(s.injectImpl) : null;
          uf(e, r, A.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function pC(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = Zd(t);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== u && st(u), Ai(a), (s.resolving = !1), ff();
          }
        }
        return o;
      }
      function Ef(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e));
      }
      function If(e, t) {
        return !(e & A.Self || (e & A.Host && t));
      }
      class ar {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return _f(this._tNode, this._lView, t, r, n);
        }
      }
      function SC() {
        return new ar(De(), v());
      }
      function Sf(e) {
        const t = e[1],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[6] : null;
      }
      const lr = "__parameters__";
      function dr(e, t, n) {
        return an(() => {
          const r = (function Qa(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, l, c) {
              const d = u.hasOwnProperty(lr)
                ? u[lr]
                : Object.defineProperty(u, lr, { value: [] })[lr];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class P {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = L({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function Wt(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Wt(n, t) : t(n)));
      }
      function Tf(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Pi(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function rt(e, t, n) {
        let r = fr(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function NC(e, t, n, r) {
                let o = e.length;
                if (o == t) e.push(n, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = n);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function Ja(e, t) {
        const n = fr(e, t);
        if (n >= 0) return e[1 | n];
      }
      function fr(e, t) {
        return (function xf(e, t, n) {
          let r = 0,
            o = e.length >> n;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << n];
            if (t === s) return i << n;
            s > t ? (o = i) : (r = i + 1);
          }
          return ~(o << n);
        })(e, t, 1);
      }
      const fo = {},
        eu = "__NG_DI_FLAG__",
        Fi = "ngTempTokenPath",
        $C = /\n/gm,
        Nf = "__source";
      let ho;
      function hr(e) {
        const t = ho;
        return (ho = e), t;
      }
      function HC(e, t = A.Default) {
        if (void 0 === ho) throw new b(-203, !1);
        return null === ho
          ? Hd(e, void 0, t)
          : ho.get(e, t & A.Optional ? null : void 0, t);
      }
      function M(e, t = A.Default) {
        return (
          (function Tw() {
            return Ia;
          })() || HC
        )(x(e), t);
      }
      function de(e, t = A.Default) {
        return (
          "number" != typeof t &&
            (t =
              0 |
              (t.optional && 8) |
              (t.host && 1) |
              (t.self && 2) |
              (t.skipSelf && 4)),
          M(e, t)
        );
      }
      function tu(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = x(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new b(900, !1);
            let o,
              i = A.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = UC(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(M(o, i));
          } else t.push(M(r));
        }
        return t;
      }
      function po(e, t) {
        return (e[eu] = t), (e.prototype[eu] = t), e;
      }
      function UC(e) {
        return e[eu];
      }
      const go = po(dr("Optional"), 8),
        mo = po(dr("SkipSelf"), 4);
      let ru;
      class Gf {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      function dn(e) {
        return e instanceof Gf ? e.changingThisBreaksApplicationSecurity : e;
      }
      const h_ =
        /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
      var pe = (() => (
        ((pe = pe || {})[(pe.NONE = 0)] = "NONE"),
        (pe[(pe.HTML = 1)] = "HTML"),
        (pe[(pe.STYLE = 2)] = "STYLE"),
        (pe[(pe.SCRIPT = 3)] = "SCRIPT"),
        (pe[(pe.URL = 4)] = "URL"),
        (pe[(pe.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        pe
      ))();
      function cu(e) {
        const t = (function Co() {
          const e = v();
          return e && e[12];
        })();
        return t
          ? t.sanitize(pe.URL, e) || ""
          : (function Do(e, t) {
              const n = (function l_(e) {
                return (e instanceof Gf && e.getTypeName()) || null;
              })(e);
              if (null != n && n !== t) {
                if ("ResourceURL" === n && "URL" === t) return !0;
                throw new Error(
                  `Required a safe ${t}, got a ${n} (see https://g.co/ng/security#xss)`
                );
              }
              return n === t;
            })(e, "URL")
          ? dn(e)
          : (function su(e) {
              return (e = String(e)).match(h_) ? e : "unsafe:" + e;
            })(O(e));
      }
      const du = new P("ENVIRONMENT_INITIALIZER"),
        Xf = new P("INJECTOR", -1),
        eh = new P("INJECTOR_DEF_TYPES");
      class th {
        get(t, n = fo) {
          if (n === fo) {
            const r = new Error(`NullInjectorError: No provider for ${X(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function M_(...e) {
        return { ɵproviders: nh(0, e) };
      }
      function nh(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        return (
          Wt(t, (i) => {
            const s = i;
            fu(s, n, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && rh(o, n),
          n
        );
      }
      function rh(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n];
          Wt(o, (i) => {
            t.push(i);
          });
        }
      }
      function fu(e, t, n, r) {
        if (!(e = x(e))) return !1;
        let o = null,
          i = $d(e);
        const s = !i && Z(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((i = $d(u)), !i)) return !1;
          o = u;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const u =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const l of u) fu(l, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let l;
              r.add(o);
              try {
                Wt(i.imports, (c) => {
                  fu(c, t, n, r) && (l || (l = []), l.push(c));
                });
              } finally {
              }
              void 0 !== l && rh(l, t);
            }
            if (!a) {
              const l = On(o) || (() => new o());
              t.push(
                { provide: o, useFactory: l, deps: q },
                { provide: eh, useValue: o, multi: !0 },
                { provide: du, useValue: () => M(o), multi: !0 }
              );
            }
            const u = i.providers;
            null == u ||
              a ||
              Wt(u, (c) => {
                t.push(c);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      const T_ = J({ provide: String, useValue: J });
      function hu(e) {
        return null !== e && "object" == typeof e && T_ in e;
      }
      function kn(e) {
        return "function" == typeof e;
      }
      const pu = new P("Set Injector scope."),
        Bi = {},
        R_ = {};
      let gu;
      function Hi() {
        return void 0 === gu && (gu = new th()), gu;
      }
      class fn {}
      class sh extends fn {
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            yu(t, (s) => this.processProvider(s)),
            this.records.set(Xf, mr(void 0, this)),
            o.has("environment") && this.records.set(fn, mr(void 0, this));
          const i = this.records.get(pu);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(eh.multi, q, A.Self)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = hr(this),
            r = st(void 0);
          try {
            return t();
          } finally {
            hr(n), st(r);
          }
        }
        get(t, n = fo, r = A.Default) {
          this.assertNotDestroyed();
          const o = hr(this),
            i = st(void 0);
          try {
            if (!(r & A.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const u =
                  (function F_(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof P)
                    );
                  })(t) && pi(t);
                (a = u && this.injectableDefInScope(u) ? mr(mu(t), Bi) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & A.Self ? Hi() : this.parent).get(
              t,
              (n = r & A.Optional && n === fo ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[Fi] = s[Fi] || []).unshift(X(t)), o)) throw s;
              return (function zC(e, t, n, r) {
                const o = e[Fi];
                throw (
                  (t[Nf] && o.unshift(t[Nf]),
                  (e.message = (function GC(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let o = X(t);
                    if (Array.isArray(t)) o = t.map(X).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : X(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      $C,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[Fi] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            st(i), hr(o);
          }
        }
        resolveInjectorInitializers() {
          const t = hr(this),
            n = st(void 0);
          try {
            const r = this.get(du.multi, q, A.Self);
            for (const o of r) o();
          } finally {
            hr(t), st(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(X(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new b(205, !1);
        }
        processProvider(t) {
          let n = kn((t = x(t))) ? t : x(t && t.provide);
          const r = (function N_(e) {
            return hu(e)
              ? mr(void 0, e.useValue)
              : mr(
                  (function ah(e, t, n) {
                    let r;
                    if (kn(e)) {
                      const o = x(e);
                      return On(o) || mu(o);
                    }
                    if (hu(e)) r = () => x(e.useValue);
                    else if (
                      (function ih(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...tu(e.deps || []));
                    else if (
                      (function oh(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => M(x(e.useExisting));
                    else {
                      const o = x(e && (e.useClass || e.provide));
                      if (
                        !(function P_(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return On(o) || mu(o);
                      r = () => new o(...tu(e.deps));
                    }
                    return r;
                  })(e),
                  Bi
                );
          })(t);
          if (kn(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = mr(void 0, Bi, !0)),
              (o.factory = () => tu(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === Bi && ((n.value = R_), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function O_(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = x(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function mu(e) {
        const t = pi(e),
          n = null !== t ? t.factory : On(e);
        if (null !== n) return n;
        if (e instanceof P) throw new b(204, !1);
        if (e instanceof Function)
          return (function x_(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function co(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new b(204, !1))
              );
            const n = (function Iw(e) {
              const t = e && (e[gi] || e[Bd]);
              if (t) {
                const n = (function Sw(e) {
                  if (e.hasOwnProperty("name")) return e.name;
                  const t = ("" + e).match(/^function\s*([^\s(]+)/);
                  return null === t ? "" : t[1];
                })(e);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  t
                );
              }
              return null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new b(204, !1);
      }
      function mr(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function k_(e) {
        return !!e.ɵproviders;
      }
      function yu(e, t) {
        for (const n of e)
          Array.isArray(n) ? yu(n, t) : k_(n) ? yu(n.ɵproviders, t) : t(n);
      }
      class uh {}
      class V_ {
        resolveComponentFactory(t) {
          throw (function j_(e) {
            const t = Error(
              `No component factory found for ${X(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let _o = (() => {
        class e {}
        return (e.NULL = new V_()), e;
      })();
      function $_() {
        return yr(De(), v());
      }
      function yr(e, t) {
        return new hn(lt(e, t));
      }
      let hn = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = $_), e;
      })();
      class ch {}
      let U_ = (() => {
        class e {}
        return (
          (e.ɵprov = L({ token: e, providedIn: "root", factory: () => null })),
          e
        );
      })();
      class zi {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const z_ = new zi("14.2.2"),
        vu = {};
      function bu(e) {
        return e.ngOriginalError;
      }
      class vr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && bu(t);
          for (; n && bu(n); ) n = bu(n);
          return n || null;
        }
      }
      const Eu = new Map();
      let n0 = 0;
      const Su = "__ngContext__";
      function Oe(e, t) {
        qe(t)
          ? ((e[Su] = t[20]),
            (function o0(e) {
              Eu.set(e[20], e);
            })(t))
          : (e[Su] = t);
      }
      function Kt(e) {
        return e instanceof Function ? e() : e;
      }
      var Ke = (() => (
        ((Ke = Ke || {})[(Ke.Important = 1)] = "Important"),
        (Ke[(Ke.DashCase = 2)] = "DashCase"),
        Ke
      ))();
      function Tu(e, t) {
        return undefined(e, t);
      }
      function Eo(e) {
        const t = e[3];
        return mt(t) ? t[3] : t;
      }
      function Au(e) {
        return Eh(e[13]);
      }
      function Ru(e) {
        return Eh(e[4]);
      }
      function Eh(e) {
        for (; null !== e && !mt(e); ) e = e[4];
        return e;
      }
      function wr(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          mt(r) ? (i = r) : qe(r) && ((s = !0), (r = r[0]));
          const a = he(r);
          0 === e && null !== n
            ? null == o
              ? Rh(t, n, a)
              : Ln(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? Ln(t, n, a, o || null, !0)
            : 2 === e
            ? (function Lh(e, t, n) {
                const r = Gi(e, t);
                r &&
                  (function N0(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function F0(e, t, n, r, o) {
                const i = n[7];
                i !== he(n) && wr(t, e, r, i, o);
                for (let a = 10; a < n.length; a++) {
                  const u = n[a];
                  Io(u[1], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function Nu(e, t, n) {
        return e.createElement(t, n);
      }
      function Sh(e, t) {
        const n = e[9],
          r = n.indexOf(t),
          o = t[3];
        512 & t[2] && ((t[2] &= -513), ka(o, -1)), n.splice(r, 1);
      }
      function Pu(e, t) {
        if (e.length <= 10) return;
        const n = 10 + t,
          r = e[n];
        if (r) {
          const o = r[17];
          null !== o && o !== e && Sh(o, r), t > 0 && (e[n - 1][4] = r[4]);
          const i = Pi(e, 10 + t);
          !(function E0(e, t) {
            Io(e, t, t[V], 2, null, null), (t[0] = null), (t[6] = null);
          })(r[1], r);
          const s = i[19];
          null !== s && s.detachView(i[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -65);
        }
        return r;
      }
      function Mh(e, t) {
        if (!(128 & t[2])) {
          const n = t[V];
          n.destroyNode && Io(e, t, n, 3, null, null),
            (function M0(e) {
              let t = e[13];
              if (!t) return Ou(e[1], e);
              for (; t; ) {
                let n = null;
                if (qe(t)) n = t[13];
                else {
                  const r = t[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    qe(t) && Ou(t[1], t), (t = t[3]);
                  null === t && (t = e), qe(t) && Ou(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function Ou(e, t) {
        if (!(128 & t[2])) {
          (t[2] &= -65),
            (t[2] |= 128),
            (function x0(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof ro)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        try {
                          u.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        i.call(o);
                      } finally {
                      }
                  }
                }
            })(e, t),
            (function R0(e, t) {
              const n = e.cleanup,
                r = t[7];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 1],
                      a = "function" == typeof s ? s(t) : he(t[s]),
                      u = r[(o = n[i + 2])],
                      l = n[i + 3];
                    "boolean" == typeof l
                      ? a.removeEventListener(n[i], u, l)
                      : l >= 0
                      ? r[(o = l)]()
                      : r[(o = -l)].unsubscribe(),
                      (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                t[7] = null;
              }
            })(e, t),
            1 === t[1].type && t[V].destroy();
          const n = t[17];
          if (null !== n && mt(t[3])) {
            n !== t[3] && Sh(n, t);
            const r = t[19];
            null !== r && r.detachView(e);
          }
          !(function s0(e) {
            Eu.delete(e[20]);
          })(t);
        }
      }
      function Th(e, t, n) {
        return (function Ah(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const o = e.data[r.directiveStart].encapsulation;
            if (o === xt.None || o === xt.Emulated) return null;
          }
          return lt(r, n);
        })(e, t.parent, n);
      }
      function Ln(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function Rh(e, t, n) {
        e.appendChild(t, n);
      }
      function xh(e, t, n, r, o) {
        null !== r ? Ln(e, t, n, r, o) : Rh(e, t, n);
      }
      function Gi(e, t) {
        return e.parentNode(t);
      }
      let Oh = function Ph(e, t, n) {
        return 40 & e.type ? lt(e, n) : null;
      };
      function Wi(e, t, n, r) {
        const o = Th(e, r, t),
          i = t[V],
          a = (function Nh(e, t, n) {
            return Oh(e, t, n);
          })(r.parent || t[6], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) xh(i, o, n[u], a, !1);
          else xh(i, o, n, a, !1);
      }
      function qi(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return lt(t, e);
          if (4 & n) return ku(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return qi(e, r);
            {
              const o = e[t.index];
              return mt(o) ? ku(-1, o) : he(o);
            }
          }
          if (32 & n) return Tu(t, e)() || he(e[t.index]);
          {
            const r = kh(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : qi(Eo(e[16]), r)
              : qi(e, t.next);
          }
        }
        return null;
      }
      function kh(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null;
      }
      function ku(e, t) {
        const n = 10 + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[1].firstChild;
          if (null !== o) return qi(r, o);
        }
        return t[7];
      }
      function Lu(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && Oe(he(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & u) Lu(e, t, n.child, r, o, i, !1), wr(t, e, o, a, i);
            else if (32 & u) {
              const l = Tu(n, r);
              let c;
              for (; (c = l()); ) wr(t, e, o, c, i);
              wr(t, e, o, a, i);
            } else 16 & u ? jh(e, t, r, n, o, i) : wr(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Io(e, t, n, r, o, i) {
        Lu(n, r, e.firstChild, t, o, i, !1);
      }
      function jh(e, t, n, r, o, i) {
        const s = n[16],
          u = s[6].projection[r.projection];
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) wr(t, e, o, u[l], i);
        else Lu(e, t, u, s[3], o, i, !0);
      }
      function Vh(e, t, n) {
        e.setAttribute(t, "style", n);
      }
      function ju(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function $h(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const Bh = "ng-template";
      function L0(e, t, n) {
        let r = 0;
        for (; r < e.length; ) {
          let o = e[r++];
          if (n && "class" === o) {
            if (((o = e[r]), -1 !== $h(o.toLowerCase(), t, 0))) return !0;
          } else if (1 === o) {
            for (; r < e.length && "string" == typeof (o = e[r++]); )
              if (o.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Hh(e) {
        return 4 === e.type && e.value !== Bh;
      }
      function j0(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Bh);
      }
      function V0(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function H0(e) {
            for (let t = 0; t < e.length; t++) if (pf(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !j0(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (vt(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!L0(e.attrs, l, n)) {
                    if (vt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = $0(8 & r ? "class" : u, o, Hh(e), n);
                if (-1 === d) {
                  if (vt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== $h(h, l, 0)) || (2 & r && l !== f)) {
                    if (vt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !vt(r) && !vt(u)) return !1;
            if (s && vt(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return vt(r) || s;
      }
      function vt(e) {
        return 0 == (1 & e);
      }
      function $0(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function U0(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Uh(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (V0(e, t[r], n)) return !0;
        return !1;
      }
      function zh(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function G0(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !vt(s) && ((t += zh(i, o)), (o = "")),
              (r = s),
              (i = i || !vt(r));
          n++;
        }
        return "" !== o && (t += zh(i, o)), t;
      }
      const F = {};
      function Te(e) {
        Gh(U(), v(), Be() + e, !1);
      }
      function Gh(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const i = e.preOrderCheckHooks;
            null !== i && Ii(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && Si(t, i, 0, n);
          }
        ln(n);
      }
      function Zh(e, t = null, n = null, r) {
        const o = Qh(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function Qh(e, t = null, n = null, r, o = new Set()) {
        const i = [n || q, M_(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : X(e))),
          new sh(i, t || Hi(), r || null, o)
        );
      }
      let Dt = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return Zh({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return Zh({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = fo),
          (e.NULL = new th()),
          (e.ɵprov = L({ token: e, providedIn: "any", factory: () => M(Xf) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function E(e, t = A.Default) {
        const n = v();
        return null === n ? M(e, t) : _f(De(), n, x(e), t);
      }
      function Uu() {
        throw new Error("invalid");
      }
      function Zi(e, t) {
        return (e << 17) | (t << 2);
      }
      function wt(e) {
        return (e >> 17) & 32767;
      }
      function zu(e) {
        return 2 | e;
      }
      function Zt(e) {
        return (131068 & e) >> 2;
      }
      function Gu(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function Wu(e) {
        return 1 | e;
      }
      function hp(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const o = n[r],
              i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              Ba(o), s.contentQueries(2, t[i], i);
            }
          }
      }
      function Ji(e, t, n, r, o, i, s, a, u, l, c) {
        const d = t.blueprint.slice();
        return (
          (d[0] = o),
          (d[2] = 76 | r),
          (null !== c || (e && 1024 & e[2])) && (d[2] |= 1024),
          Jd(d),
          (d[3] = d[15] = e),
          (d[8] = n),
          (d[10] = s || (e && e[10])),
          (d[V] = a || (e && e[V])),
          (d[12] = u || (e && e[12]) || null),
          (d[9] = l || (e && e[9]) || null),
          (d[6] = i),
          (d[20] = (function r0() {
            return n0++;
          })()),
          (d[21] = c),
          (d[16] = 2 == t.type ? e[16] : d),
          d
        );
      }
      function _r(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function el(e, t, n, r, o) {
            const i = tf(),
              s = La(),
              u = (e.data[t] = (function Mb(e, t, n, r, o, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && (i.next = u)),
              u
            );
          })(e, t, n, r, o)),
            (function rC() {
              return N.lFrame.inI18n;
            })() && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function no() {
            const e = N.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Nt(i, !0), i;
      }
      function br(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function tl(e, t, n) {
        Ha(t);
        try {
          const r = e.viewQuery;
          null !== r && ll(1, r, n);
          const o = e.template;
          null !== o && pp(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && hp(e, t),
            e.staticViewQueries && ll(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function Eb(e, t) {
              for (let n = 0; n < t.length; n++) Ub(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[2] &= -5), Ua();
        }
      }
      function Xi(e, t, n, r) {
        const o = t[2];
        if (128 != (128 & o)) {
          Ha(t);
          try {
            Jd(t),
              (function rf(e) {
                return (N.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && pp(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const l = e.preOrderCheckHooks;
              null !== l && Ii(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && Si(t, l, 0, null), za(t, 0);
            }
            if (
              ((function Bb(e) {
                for (let t = Au(e); null !== t; t = Ru(t)) {
                  if (!t[2]) continue;
                  const n = t[9];
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r],
                      i = o[3];
                    0 == (512 & o[2]) && ka(i, 1), (o[2] |= 512);
                  }
                }
              })(t),
              (function $b(e) {
                for (let t = Au(e); null !== t; t = Ru(t))
                  for (let n = 10; n < t.length; n++) {
                    const r = t[n],
                      o = r[1];
                    bi(r) && Xi(o, r, o.template, r[8]);
                  }
              })(t),
              null !== e.contentQueries && hp(e, t),
              s)
            ) {
              const l = e.contentCheckHooks;
              null !== l && Ii(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && Si(t, l, 1), za(t, 1);
            }
            !(function _b(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    if (o < 0) ln(~o);
                    else {
                      const i = o,
                        s = n[++r],
                        a = n[++r];
                      oC(s, i), a(2, t[i]);
                    }
                  }
                } finally {
                  ln(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function bb(e, t) {
                for (let n = 0; n < t.length; n++) Hb(e, t[n]);
              })(t, a);
            const u = e.viewQuery;
            if ((null !== u && ll(2, u, r), s)) {
              const l = e.viewCheckHooks;
              null !== l && Ii(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && Si(t, l, 2), za(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[2] &= -41),
              512 & t[2] && ((t[2] &= -513), ka(t[3], -1));
          } finally {
            Ua();
          }
        }
      }
      function pp(e, t, n, r, o) {
        const i = Be(),
          s = 2 & r;
        try {
          ln(-1), s && t.length > 22 && Gh(e, t, 22, !1), n(r, o);
        } finally {
          ln(i);
        }
      }
      function gp(e, t, n) {
        if (Ra(t)) {
          const o = t.directiveEnd;
          for (let i = t.directiveStart; i < o; i++) {
            const s = e.data[i];
            s.contentQueries && s.contentQueries(1, n[i], i);
          }
        }
      }
      function nl(e, t, n) {
        !ef() ||
          ((function Nb(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            e.firstCreatePass || io(n, t), Oe(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                l = yt(u);
              l && Lb(t, n, u);
              const c = so(t, e, a, n);
              Oe(c, t),
                null !== s && jb(0, a - o, c, u, 0, s),
                l && (tt(n.index, t)[8] = c);
            }
          })(e, t, n, lt(n, t)),
          128 == (128 & n.flags) &&
            (function Pb(e, t, n) {
              const r = n.directiveStart,
                o = n.directiveEnd,
                i = n.index,
                s = (function iC() {
                  return N.lFrame.currentDirectiveIndex;
                })();
              try {
                ln(i);
                for (let a = r; a < o; a++) {
                  const u = e.data[a],
                    l = t[a];
                  Va(a),
                    (null !== u.hostBindings ||
                      0 !== u.hostVars ||
                      null !== u.hostAttrs) &&
                      _p(u, l);
                }
              } finally {
                ln(-1), Va(s);
              }
            })(e, t, n));
      }
      function rl(e, t, n = lt) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function mp(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = ol(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function ol(e, t, n, r, o, i, s, a, u, l) {
        const c = 22 + r,
          d = c + o,
          f = (function Ib(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : F);
            return n;
          })(c, d),
          h = "function" == typeof l ? l() : l;
        return (f[1] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function vp(e, t, n) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            const o = e[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(t, o)
              : (n[r] = [t, o]);
          }
        return n;
      }
      function Dp(e, t) {
        const r = t.directiveEnd,
          o = e.data,
          i = t.attrs,
          s = [];
        let a = null,
          u = null;
        for (let l = t.directiveStart; l < r; l++) {
          const c = o[l],
            d = c.inputs,
            f = null === i || Hh(t) ? null : Vb(d, i);
          s.push(f), (a = vp(d, l, a)), (u = vp(c.outputs, l, u));
        }
        null !== a &&
          (a.hasOwnProperty("class") && (t.flags |= 16),
          a.hasOwnProperty("style") && (t.flags |= 32)),
          (t.initialInputs = s),
          (t.inputs = a),
          (t.outputs = u);
      }
      function wp(e, t) {
        const n = tt(t, e);
        16 & n[2] || (n[2] |= 32);
      }
      function il(e, t, n, r) {
        let o = !1;
        if (ef()) {
          const i = (function Ob(e, t, n) {
              const r = e.directiveRegistry;
              let o = null;
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const s = r[i];
                  Uh(n, s.selectors, !1) &&
                    (o || (o = []),
                    xi(io(n, t), e, s.type),
                    yt(s) ? (bp(e, n), o.unshift(s)) : o.push(s));
                }
              return o;
            })(e, t, n),
            s = null === r ? null : { "": -1 };
          if (null !== i) {
            (o = !0), Ep(n, e.data.length, i.length);
            for (let c = 0; c < i.length; c++) {
              const d = i[c];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              u = !1,
              l = br(e, t, i.length, null);
            for (let c = 0; c < i.length; c++) {
              const d = i[c];
              (n.mergedAttrs = Ti(n.mergedAttrs, d.hostAttrs)),
                Ip(e, n, t, l, d),
                kb(l, d, s),
                null !== d.contentQueries && (n.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (n.flags |= 128);
              const f = d.type.prototype;
              !a &&
                (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
                (a = !0)),
                !u &&
                  (f.ngOnChanges || f.ngDoCheck) &&
                  ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (u = !0)),
                l++;
            }
            Dp(e, n);
          }
          s &&
            (function Fb(e, t, n) {
              if (t) {
                const r = (e.localNames = []);
                for (let o = 0; o < t.length; o += 2) {
                  const i = n[t[o + 1]];
                  if (null == i) throw new b(-301, !1);
                  r.push(t[o], i);
                }
              }
            })(n, r, s);
        }
        return (n.mergedAttrs = Ti(n.mergedAttrs, n.attrs)), o;
      }
      function Cp(e, t, n, r, o, i) {
        const s = i.hostBindings;
        if (s) {
          let a = e.hostBindingOpCodes;
          null === a && (a = e.hostBindingOpCodes = []);
          const u = ~t.index;
          (function xb(e) {
            let t = e.length;
            for (; t > 0; ) {
              const n = e[--t];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(a) != u && a.push(u),
            a.push(r, o, s);
        }
      }
      function _p(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function bp(e, t) {
        (t.flags |= 2), (e.components || (e.components = [])).push(t.index);
      }
      function kb(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          yt(t) && (n[""] = e);
        }
      }
      function Ep(e, t, n) {
        (e.flags |= 1),
          (e.directiveStart = t),
          (e.directiveEnd = t + n),
          (e.providerIndexes = t);
      }
      function Ip(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = On(o.type)),
          s = new ro(i, yt(o), E);
        (e.blueprint[r] = s),
          (n[r] = s),
          Cp(e, t, 0, r, br(e, n, o.hostVars, F), o);
      }
      function Lb(e, t, n) {
        const r = lt(t, e),
          o = mp(n),
          i = e[10],
          s = es(
            e,
            Ji(
              e,
              o,
              null,
              n.onPush ? 32 : 16,
              r,
              t,
              i,
              i.createRenderer(r, n),
              null,
              null,
              null
            )
          );
        e[t.index] = s;
      }
      function Ot(e, t, n, r, o, i) {
        const s = lt(e, t);
        !(function sl(e, t, n, r, o, i, s) {
          if (null == i) e.removeAttribute(t, o, n);
          else {
            const a = null == s ? O(i) : s(i, r || "", o);
            e.setAttribute(t, o, a, n);
          }
        })(t[V], s, i, e.value, n, r, o);
      }
      function jb(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s) {
          const a = r.setInput;
          for (let u = 0; u < s.length; ) {
            const l = s[u++],
              c = s[u++],
              d = s[u++];
            null !== a ? r.setInput(n, d, l, c) : (n[c] = d);
          }
        }
      }
      function Vb(e, t) {
        let n = null,
          r = 0;
        for (; r < t.length; ) {
          const o = t[r];
          if (0 !== o)
            if (5 !== o) {
              if ("number" == typeof o) break;
              e.hasOwnProperty(o) &&
                (null === n && (n = []), n.push(o, e[o], t[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function Sp(e, t, n, r) {
        return new Array(e, !0, !1, t, null, 0, r, n, null, null);
      }
      function Hb(e, t) {
        const n = tt(t, e);
        if (bi(n)) {
          const r = n[1];
          48 & n[2] ? Xi(r, n, r.template, n[8]) : n[5] > 0 && al(n);
        }
      }
      function al(e) {
        for (let r = Au(e); null !== r; r = Ru(r))
          for (let o = 10; o < r.length; o++) {
            const i = r[o];
            if (bi(i))
              if (512 & i[2]) {
                const s = i[1];
                Xi(s, i, s.template, i[8]);
              } else i[5] > 0 && al(i);
          }
        const n = e[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = tt(n[r], e);
            bi(o) && o[5] > 0 && al(o);
          }
      }
      function Ub(e, t) {
        const n = tt(t, e),
          r = n[1];
        (function zb(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          tl(r, n, n[8]);
      }
      function es(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function ul(e) {
        for (; e; ) {
          e[2] |= 32;
          const t = Eo(e);
          if (Fw(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function ts(e, t, n, r = !0) {
        const o = t[10];
        o.begin && o.begin();
        try {
          Xi(e, t, e.template, n);
        } catch (s) {
          throw (r && Rp(t, s), s);
        } finally {
          o.end && o.end();
        }
      }
      function ll(e, t, n) {
        Ba(0), t(e, n);
      }
      function Mp(e) {
        return e[7] || (e[7] = []);
      }
      function Tp(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function Rp(e, t) {
        const n = e[9],
          r = n ? n.get(vr, null) : null;
        r && r.handleError(t);
      }
      function cl(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            u = t[s],
            l = e.data[s];
          null !== l.setInput ? l.setInput(u, o, r, a) : (u[a] = o);
        }
      }
      function ns(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = Ca(o, a))
              : 2 == i && (r = Ca(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function rs(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(he(i)), mt(i)))
            for (let a = 10; a < i.length; a++) {
              const u = i[a],
                l = u[1].firstChild;
              null !== l && rs(u[1], u, l, r);
            }
          const s = n.type;
          if (8 & s) rs(e, t, n.child, r);
          else if (32 & s) {
            const a = Tu(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = kh(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = Eo(t[16]);
              rs(u[1], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class So {
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            n = t[1];
          return rs(n, t, n.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (mt(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Pu(t, r), Pi(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Mh(this._lView[1], this._lView);
        }
        onDestroy(t) {
          !(function yp(e, t, n, r) {
            const o = Mp(t);
            null === n
              ? o.push(r)
              : (o.push(n), e.firstCreatePass && Tp(e).push(r, o.length - 1));
          })(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          ul(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -65;
        }
        reattach() {
          this._lView[2] |= 64;
        }
        detectChanges() {
          ts(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new b(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function S0(e, t) {
              Io(e, t, t[V], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new b(902, !1);
          this._appRef = t;
        }
      }
      class Gb extends So {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          ts(t[1], t, t[8], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class dl extends _o {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = Z(t);
          return new Mo(n, this.ngModule);
        }
      }
      function xp(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class qb {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          const o = this.injector.get(t, vu, r);
          return o !== vu || n === vu ? o : this.parentInjector.get(t, n, r);
        }
      }
      class Mo extends uh {
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function W0(e) {
              return e.map(G0).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        get inputs() {
          return xp(this.componentDef.inputs);
        }
        get outputs() {
          return xp(this.componentDef.outputs);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof fn ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new qb(t, i) : t,
            a = s.get(ch, null);
          if (null === a) throw new b(407, !1);
          const u = s.get(U_, null),
            l = a.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function Sb(e, t, n) {
                  return e.selectRootElement(t, n === xt.ShadowDom);
                })(l, r, this.componentDef.encapsulation)
              : Nu(
                  a.createRenderer(null, this.componentDef),
                  c,
                  (function Wb(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(c)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = ol(0, null, null, 1, 0, null, null, null, null, null),
            p = Ji(null, h, null, f, null, null, a, l, u, s, null);
          let g, y;
          Ha(p);
          try {
            const D = (function Qb(e, t, n, r, o, i) {
              const s = n[1];
              n[22] = e;
              const u = _r(s, 22, 2, "#host", null),
                l = (u.mergedAttrs = t.hostAttrs);
              null !== l &&
                (ns(u, l, !0),
                null !== e &&
                  (Mi(o, e, l),
                  null !== u.classes && ju(o, e, u.classes),
                  null !== u.styles && Vh(o, e, u.styles)));
              const c = r.createRenderer(e, t),
                d = Ji(
                  n,
                  mp(t),
                  null,
                  t.onPush ? 32 : 16,
                  n[22],
                  u,
                  r,
                  c,
                  i || null,
                  null,
                  null
                );
              return (
                s.firstCreatePass &&
                  (xi(io(u, n), s, t.type), bp(s, u), Ep(u, n.length, 1)),
                es(n, d),
                (n[22] = d)
              );
            })(d, this.componentDef, p, a, l);
            if (d)
              if (r) Mi(l, d, ["ng-version", z_.full]);
              else {
                const { attrs: w, classes: m } = (function q0(e) {
                  const t = [],
                    n = [];
                  let r = 1,
                    o = 2;
                  for (; r < e.length; ) {
                    let i = e[r];
                    if ("string" == typeof i)
                      2 === o
                        ? "" !== i && t.push(i, e[++r])
                        : 8 === o && n.push(i);
                    else {
                      if (!vt(o)) break;
                      o = i;
                    }
                    r++;
                  }
                  return { attrs: t, classes: n };
                })(this.componentDef.selectors[0]);
                w && Mi(l, d, w), m && m.length > 0 && ju(l, d, m.join(" "));
              }
            if (((y = Fa(h, 22)), void 0 !== n)) {
              const w = (y.projection = []);
              for (let m = 0; m < this.ngContentSelectors.length; m++) {
                const I = n[m];
                w.push(null != I ? Array.from(I) : null);
              }
            }
            (g = (function Yb(e, t, n, r) {
              const o = n[1],
                i = (function Rb(e, t, n) {
                  const r = De();
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Ip(e, r, t, br(e, t, 1, null), n),
                    Dp(e, r));
                  const o = so(t, e, r.directiveStart, r);
                  Oe(o, t);
                  const i = lt(r, t);
                  return i && Oe(i, t), o;
                })(o, n, t);
              if (((e[8] = n[8] = i), null !== r)) for (const a of r) a(i, t);
              if (t.contentQueries) {
                const a = De();
                t.contentQueries(1, i, a.directiveStart);
              }
              const s = De();
              return (
                !o.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (ln(s.index),
                  Cp(n[1], s, 0, s.directiveStart, s.directiveEnd, t),
                  _p(t, i)),
                i
              );
            })(D, this.componentDef, p, [Jb])),
              tl(h, p, null);
          } finally {
            Ua();
          }
          return new Zb(this.componentType, g, yr(y, p), p, y);
        }
      }
      class Zb extends class L_ {} {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new Gb(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            const i = this._rootLView;
            cl(i[1], i, o, t, n), wp(i, this._tNode.index);
          }
        }
        get injector() {
          return new ar(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function Jb() {
        const e = De();
        Ei(v()[1], e);
      }
      let os = null;
      function jn() {
        if (!os) {
          const e = ee.Symbol;
          if (e && e.iterator) os = e.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < t.length; ++n) {
              const r = t[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (os = r);
            }
          }
        }
        return os;
      }
      function To(e) {
        return (
          !!(function hl(e) {
            return (
              null !== e && ("function" == typeof e || "object" == typeof e)
            );
          })(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && jn() in e))
        );
      }
      function Fe(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function pl(e, t, n, r) {
        const o = v();
        return Fe(o, or(), t) && (U(), Ot(le(), o, e, t, n, r)), pl;
      }
      function Ct(e, t, n) {
        const r = v();
        return (
          Fe(r, or(), t) &&
            (function ot(e, t, n, r, o, i, s, a) {
              const u = lt(t, n);
              let c,
                l = t.inputs;
              !a && null != l && (c = l[r])
                ? (cl(e, n, c, r, o), wi(t) && wp(n, t.index))
                : 3 & t.type &&
                  ((r = (function Tb(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (o = null != s ? s(o, t.value || "", r) : o),
                  i.setProperty(u, r, o));
            })(U(), le(), r, e, t, r[V], n, !1),
          Ct
        );
      }
      function gl(e, t, n, r, o) {
        const s = o ? "class" : "style";
        cl(e, n, t.inputs[s], s, r);
      }
      function Q(e, t, n, r) {
        const o = v(),
          i = U(),
          s = 22 + e,
          a = o[V],
          u = (o[s] = Nu(
            a,
            t,
            (function hC() {
              return N.lFrame.currentNamespace;
            })()
          )),
          l = i.firstCreatePass
            ? (function hE(e, t, n, r, o, i, s) {
                const a = t.consts,
                  l = _r(t, e, 2, o, un(a, i));
                return (
                  il(t, n, l, un(a, s)),
                  null !== l.attrs && ns(l, l.attrs, !1),
                  null !== l.mergedAttrs && ns(l, l.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, l),
                  l
                );
              })(s, i, o, 0, t, n, r)
            : i.data[s];
        Nt(l, !0);
        const c = l.mergedAttrs;
        null !== c && Mi(a, u, c);
        const d = l.classes;
        null !== d && ju(a, u, d);
        const f = l.styles;
        return (
          null !== f && Vh(a, u, f),
          64 != (64 & l.flags) && Wi(i, o, u, l),
          0 ===
            (function Zw() {
              return N.lFrame.elementDepthCount;
            })() && Oe(u, o),
          (function Qw() {
            N.lFrame.elementDepthCount++;
          })(),
          Ci(l) && (nl(i, o, l), gp(i, l, o)),
          null !== r && rl(o, l),
          Q
        );
      }
      function Y() {
        let e = De();
        La() ? ja() : ((e = e.parent), Nt(e, !1));
        const t = e;
        !(function Yw() {
          N.lFrame.elementDepthCount--;
        })();
        const n = U();
        return (
          n.firstCreatePass && (Ei(n, e), Ra(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function vC(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            gl(n, t, v(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function DC(e) {
              return 0 != (32 & e.flags);
            })(t) &&
            gl(n, t, v(), t.stylesWithoutHost, !1),
          Y
        );
      }
      function ss(e, t, n, r) {
        return Q(e, t, n, r), Y(), ss;
      }
      function as(e, t, n) {
        const r = v(),
          o = U(),
          i = e + 22,
          s = o.firstCreatePass
            ? (function pE(e, t, n, r, o) {
                const i = t.consts,
                  s = un(i, r),
                  a = _r(t, e, 8, "ng-container", s);
                return (
                  null !== s && ns(a, s, !0),
                  il(t, n, a, un(i, o)),
                  null !== t.queries && t.queries.elementStart(t, a),
                  a
                );
              })(i, o, r, t, n)
            : o.data[i];
        Nt(s, !0);
        const a = (r[i] = r[V].createComment(""));
        return (
          Wi(o, r, a, s),
          Oe(a, r),
          Ci(s) && (nl(o, r, s), gp(o, s, r)),
          null != n && rl(r, s),
          as
        );
      }
      function us() {
        let e = De();
        const t = U();
        return (
          La() ? ja() : ((e = e.parent), Nt(e, !1)),
          t.firstCreatePass && (Ei(t, e), Ra(e) && t.queries.elementEnd(e)),
          us
        );
      }
      function ls(e) {
        return !!e && "function" == typeof e.then;
      }
      const Wp = function Gp(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function cs(e, t, n, r) {
        const o = v(),
          i = U(),
          s = De();
        return (
          (function Kp(e, t, n, r, o, i, s, a) {
            const u = Ci(r),
              c = e.firstCreatePass && Tp(e),
              d = t[8],
              f = Mp(t);
            let h = !0;
            if (3 & r.type || a) {
              const y = lt(r, t),
                D = a ? a(y) : y,
                w = f.length,
                m = a ? (z) => a(he(z[r.index])) : r.index;
              let I = null;
              if (
                (!a &&
                  u &&
                  (I = (function mE(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[7],
                            u = o[i + 2];
                          return a.length > u ? a[u] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== I)
              )
                ((I.__ngLastListenerFn__ || I).__ngNextListenerFn__ = i),
                  (I.__ngLastListenerFn__ = i),
                  (h = !1);
              else {
                i = Qp(r, t, d, i, !1);
                const z = n.listen(D, o, i);
                f.push(i, z), c && c.push(o, m, w, w + 1);
              }
            } else i = Qp(r, t, d, i, !1);
            const p = r.outputs;
            let g;
            if (h && null !== p && (g = p[o])) {
              const y = g.length;
              if (y)
                for (let D = 0; D < y; D += 2) {
                  const se = t[g[D]][g[D + 1]].subscribe(i),
                    Zn = f.length;
                  f.push(i, se), c && c.push(o, r.index, Zn, -(Zn + 1));
                }
            }
          })(i, o, o[V], s, e, t, 0, r),
          cs
        );
      }
      function Zp(e, t, n, r) {
        try {
          return !1 !== n(r);
        } catch (o) {
          return Rp(e, o), !1;
        }
      }
      function Qp(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          ul(2 & e.flags ? tt(e.index, t) : t);
          let u = Zp(t, 0, r, s),
            l = i.__ngNextListenerFn__;
          for (; l; ) (u = Zp(t, 0, l, s) && u), (l = l.__ngNextListenerFn__);
          return o && !1 === u && (s.preventDefault(), (s.returnValue = !1)), u;
        };
      }
      function sg(e, t, n, r, o) {
        const i = e[n + 1],
          s = null === t;
        let a = r ? wt(i) : Zt(i),
          u = !1;
        for (; 0 !== a && (!1 === u || s); ) {
          const c = e[a + 1];
          bE(e[a], t) && ((u = !0), (e[a + 1] = r ? Wu(c) : zu(c))),
            (a = r ? wt(c) : Zt(c));
        }
        u && (e[n + 1] = r ? zu(i) : Wu(i));
      }
      function bE(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && fr(e, t) >= 0)
        );
      }
      function Or(e, t) {
        return (
          (function _t(e, t, n, r) {
            const o = v(),
              i = U(),
              s = (function Gt(e) {
                const t = N.lFrame,
                  n = t.bindingIndex;
                return (t.bindingIndex = t.bindingIndex + e), n;
              })(2);
            i.firstUpdatePass &&
              (function gg(e, t, n, r) {
                const o = e.data;
                if (null === o[n + 1]) {
                  const i = o[Be()],
                    s = (function pg(e, t) {
                      return t >= e.expandoStartIndex;
                    })(e, n);
                  (function Dg(e, t) {
                    return 0 != (e.flags & (t ? 16 : 32));
                  })(i, r) &&
                    null === t &&
                    !s &&
                    (t = !1),
                    (t = (function NE(e, t, n, r) {
                      const o = (function $a(e) {
                        const t = N.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : e[t];
                      })(e);
                      let i = r ? t.residualClasses : t.residualStyles;
                      if (null === o)
                        0 === (r ? t.classBindings : t.styleBindings) &&
                          ((n = Ro((n = yl(null, e, t, n, r)), t.attrs, r)),
                          (i = null));
                      else {
                        const s = t.directiveStylingLast;
                        if (-1 === s || e[s] !== o)
                          if (((n = yl(o, e, t, n, r)), null === i)) {
                            let u = (function PE(e, t, n) {
                              const r = n ? t.classBindings : t.styleBindings;
                              if (0 !== Zt(r)) return e[wt(r)];
                            })(e, t, r);
                            void 0 !== u &&
                              Array.isArray(u) &&
                              ((u = yl(null, e, t, u[1], r)),
                              (u = Ro(u, t.attrs, r)),
                              (function OE(e, t, n, r) {
                                e[wt(n ? t.classBindings : t.styleBindings)] =
                                  r;
                              })(e, t, r, u));
                          } else
                            i = (function FE(e, t, n) {
                              let r;
                              const o = t.directiveEnd;
                              for (
                                let i = 1 + t.directiveStylingLast;
                                i < o;
                                i++
                              )
                                r = Ro(r, e[i].hostAttrs, n);
                              return Ro(r, t.attrs, n);
                            })(e, t, r);
                      }
                      return (
                        void 0 !== i &&
                          (r
                            ? (t.residualClasses = i)
                            : (t.residualStyles = i)),
                        n
                      );
                    })(o, i, t, r)),
                    (function CE(e, t, n, r, o, i) {
                      let s = i ? t.classBindings : t.styleBindings,
                        a = wt(s),
                        u = Zt(s);
                      e[r] = n;
                      let c,
                        l = !1;
                      if (Array.isArray(n)) {
                        const d = n;
                        (c = d[1]), (null === c || fr(d, c) > 0) && (l = !0);
                      } else c = n;
                      if (o)
                        if (0 !== u) {
                          const f = wt(e[a + 1]);
                          (e[r + 1] = Zi(f, a)),
                            0 !== f && (e[f + 1] = Gu(e[f + 1], r)),
                            (e[a + 1] = (function fb(e, t) {
                              return (131071 & e) | (t << 17);
                            })(e[a + 1], r));
                        } else
                          (e[r + 1] = Zi(a, 0)),
                            0 !== a && (e[a + 1] = Gu(e[a + 1], r)),
                            (a = r);
                      else
                        (e[r + 1] = Zi(u, 0)),
                          0 === a ? (a = r) : (e[u + 1] = Gu(e[u + 1], r)),
                          (u = r);
                      l && (e[r + 1] = zu(e[r + 1])),
                        sg(e, c, r, !0),
                        sg(e, c, r, !1),
                        (function _E(e, t, n, r, o) {
                          const i = o ? e.residualClasses : e.residualStyles;
                          null != i &&
                            "string" == typeof t &&
                            fr(i, t) >= 0 &&
                            (n[r + 1] = Wu(n[r + 1]));
                        })(t, c, e, r, i),
                        (s = Zi(a, u)),
                        i ? (t.classBindings = s) : (t.styleBindings = s);
                    })(o, i, t, n, s, r);
                }
              })(i, e, s, r),
              t !== F &&
                Fe(o, s, t) &&
                (function yg(e, t, n, r, o, i, s, a) {
                  if (!(3 & t.type)) return;
                  const u = e.data,
                    l = u[a + 1];
                  ds(
                    (function ip(e) {
                      return 1 == (1 & e);
                    })(l)
                      ? vg(u, t, n, o, Zt(l), s)
                      : void 0
                  ) ||
                    (ds(i) ||
                      ((function op(e) {
                        return 2 == (2 & e);
                      })(l) &&
                        (i = vg(u, null, n, o, a, s))),
                    (function k0(e, t, n, r, o) {
                      if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
                      else {
                        let i = -1 === r.indexOf("-") ? void 0 : Ke.DashCase;
                        null == o
                          ? e.removeStyle(n, r, i)
                          : ("string" == typeof o &&
                              o.endsWith("!important") &&
                              ((o = o.slice(0, -10)), (i |= Ke.Important)),
                            e.setStyle(n, r, o, i));
                      }
                    })(r, s, _i(Be(), n), o, i));
                })(
                  i,
                  i.data[Be()],
                  o,
                  o[V],
                  e,
                  (o[s + 1] = (function jE(e, t) {
                    return (
                      null == e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e && (e = X(dn(e)))),
                      e
                    );
                  })(t, n)),
                  r,
                  s
                );
          })(e, t, null, !0),
          Or
        );
      }
      function yl(e, t, n, r, o) {
        let i = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((i = t[a]), (r = Ro(r, i.hostAttrs, o)), i !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function Ro(e, t, n) {
        const r = n ? 1 : 2;
        let o = -1;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i];
            "number" == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                rt(e, s, !!n || t[++i]));
          }
        return void 0 === e ? null : e;
      }
      function vg(e, t, n, r, o, i) {
        const s = null === t;
        let a;
        for (; o > 0; ) {
          const u = e[o],
            l = Array.isArray(u),
            c = l ? u[1] : u,
            d = null === c;
          let f = n[o + 1];
          f === F && (f = d ? q : void 0);
          let h = d ? Ja(f, r) : c === r ? f : void 0;
          if ((l && !ds(h) && (h = Ja(u, r)), ds(h) && ((a = h), s))) return a;
          const p = e[o + 1];
          o = s ? wt(p) : Zt(p);
        }
        if (null !== t) {
          let u = i ? t.residualClasses : t.residualStyles;
          null != u && (a = Ja(u, r));
        }
        return a;
      }
      function ds(e) {
        return void 0 !== e;
      }
      function oe(e, t = "") {
        const n = v(),
          r = U(),
          o = e + 22,
          i = r.firstCreatePass ? _r(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function xu(e, t) {
            return e.createText(t);
          })(n[V], t));
        Wi(r, n, s, i), Nt(i, !1);
      }
      function mn(e) {
        return fs("", e, ""), mn;
      }
      function fs(e, t, n) {
        const r = v(),
          o = (function Ir(e, t, n, r) {
            return Fe(e, or(), n) ? t + O(n) + r : F;
          })(r, e, t, n);
        return (
          o !== F &&
            (function Qt(e, t, n) {
              const r = _i(t, e);
              !(function Ih(e, t, n) {
                e.setValue(t, n);
              })(e[V], r, n);
            })(r, Be(), o),
          fs
        );
      }
      const kr = "en-US";
      let Bg = kr;
      class Bn {}
      class hm {}
      class pm extends Bn {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new dl(this));
          const r = Xe(t);
          (this._bootstrapComponents = Kt(r.bootstrap)),
            (this._r3Injector = Qh(
              t,
              n,
              [
                { provide: Bn, useValue: this },
                { provide: _o, useValue: this.componentFactoryResolver },
              ],
              X(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class El extends hm {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new pm(this.moduleType, t);
        }
      }
      class iS extends Bn {
        constructor(t, n, r) {
          super(),
            (this.componentFactoryResolver = new dl(this)),
            (this.instance = null);
          const o = new sh(
            [
              ...t,
              { provide: Bn, useValue: this },
              { provide: _o, useValue: this.componentFactoryResolver },
            ],
            n || Hi(),
            r,
            new Set(["environment"])
          );
          (this.injector = o), o.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function ys(e, t, n = null) {
        return new iS(e, t, n).injector;
      }
      let sS = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n.id)) {
              const r = nh(0, n.type),
                o =
                  r.length > 0
                    ? ys([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n.id, o);
            }
            return this.cachedInjectors.get(n.id);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = L({
            token: e,
            providedIn: "environment",
            factory: () => new e(M(fn)),
          })),
          e
        );
      })();
      function gm(e) {
        e.getStandaloneInjector = (t) =>
          t.get(sS).getOrCreateStandaloneInjector(e);
      }
      function Yt(e, t, n) {
        const r =
            (function $e() {
              const e = N.lFrame;
              let t = e.bindingRootIndex;
              return (
                -1 === t &&
                  (t = e.bindingRootIndex = e.tView.bindingStartIndex),
                t
              );
            })() + e,
          o = v();
        return o[r] === F
          ? (function Ft(e, t, n) {
              return (e[t] = n);
            })(o, r, n ? t.call(n) : t())
          : (function Ao(e, t) {
              return e[t];
            })(o, r);
      }
      function Sl(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const ze = class xS extends At {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const u = t;
            (o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u));
          }
          this.__isAsync && ((i = Sl(i)), o && (o = Sl(o)), s && (s = Sl(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof it && t.add(a), a;
        }
      };
      let Jt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = FS), e;
      })();
      const PS = Jt,
        OS = class extends PS {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tViews,
              o = Ji(
                this._declarationLView,
                r,
                t,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                n || null
              );
            o[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (o[19] = s.createEmbeddedView(r)),
              tl(r, o, t),
              new So(o)
            );
          }
        };
      function FS() {
        return (function vs(e, t) {
          return 4 & e.type ? new OS(t, e, yr(e, t)) : null;
        })(De(), v());
      }
      let Et = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = kS), e;
      })();
      function kS() {
        return (function Am(e, t) {
          let n;
          const r = t[e.index];
          if (mt(r)) n = r;
          else {
            let o;
            if (8 & e.type) o = he(r);
            else {
              const i = t[V];
              o = i.createComment("");
              const s = lt(e, t);
              Ln(
                i,
                Gi(i, s),
                o,
                (function P0(e, t) {
                  return e.nextSibling(t);
                })(i, s),
                !1
              );
            }
            (t[e.index] = n = Sp(r, t, o, e)), es(t, n);
          }
          return new Mm(n, e, t);
        })(De(), v());
      }
      const LS = Et,
        Mm = class extends LS {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return yr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new ar(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Ri(this._hostTNode, this._hostLView);
            if (yf(t)) {
              const n = sr(t, this._hostLView),
                r = ir(t);
              return new ar(n[1].data[r + 8], n);
            }
            return new ar(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = Tm(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = t.createEmbeddedView(n || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function lo(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.environmentInjector || d.ngModuleRef);
            }
            const u = s ? t : new Mo(Z(t)),
              l = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const f = (s ? l : this.parentInjector).get(fn, null);
              f && (i = f);
            }
            const c = u.create(l, o, void 0, i);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[1];
            if (
              (function Kw(e) {
                return mt(e[3]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[3],
                  f = new Mm(d, d[6], d[3]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function T0(e, t, n, r) {
              const o = 10 + r,
                i = n.length;
              r > 0 && (n[o - 1][4] = t),
                r < i - 10
                  ? ((t[4] = n[o]), Tf(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n);
              const s = t[17];
              null !== s &&
                n !== s &&
                (function A0(e, t) {
                  const n = e[9];
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t);
                })(s, t);
              const a = t[19];
              null !== a && a.insertView(e), (t[2] |= 64);
            })(o, r, s, i);
            const a = ku(i, s),
              u = r[V],
              l = Gi(u, s[7]);
            return (
              null !== l &&
                (function I0(e, t, n, r, o, i) {
                  (r[0] = o), (r[6] = t), Io(e, r, n, 1, o, i);
                })(o, s[6], u, r, l, a),
              t.attachToViewContainerRef(),
              Tf(Tl(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = Tm(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Pu(this._lContainer, n);
            r && (Pi(Tl(this._lContainer), n), Mh(r[1], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Pu(this._lContainer, n);
            return r && null != Pi(Tl(this._lContainer), n) ? new So(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function Tm(e) {
        return e[8];
      }
      function Tl(e) {
        return e[8] || (e[8] = []);
      }
      function ws(...e) {}
      const Cs = new P("Application Initializer");
      let _s = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = ws),
              (this.reject = ws),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (ls(i)) n.push(i);
                else if (Wp(i)) {
                  const s = new Promise((a, u) => {
                    i.subscribe({ complete: a, error: u });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Cs, 8));
          }),
          (e.ɵprov = L({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Vo = new P("AppId", {
        providedIn: "root",
        factory: function Xm() {
          return `${Bl()}${Bl()}${Bl()}`;
        },
      });
      function Bl() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const ey = new P("Platform Initializer"),
        ty = new P("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        ny = new P("appBootstrapListener");
      let hM = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = L({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      const Xt = new P("LocaleId", {
        providedIn: "root",
        factory: () =>
          de(Xt, A.Optional | A.SkipSelf) ||
          (function pM() {
            return (typeof $localize < "u" && $localize.locale) || kr;
          })(),
      });
      class mM {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let Hl = (() => {
        class e {
          compileModuleSync(n) {
            return new El(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = Kt(Xe(n).declarations).reduce((s, a) => {
                const u = Z(a);
                return u && s.push(new Mo(u)), s;
              }, []);
            return new mM(r, i);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = L({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const DM = (() => Promise.resolve(0))();
      function Ul(e) {
        typeof Zone > "u"
          ? DM.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class _e {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ze(!1)),
            (this.onMicrotaskEmpty = new ze(!1)),
            (this.onStable = new ze(!1)),
            (this.onError = new ze(!1)),
            typeof Zone > "u")
          )
            throw new b(908, !1);
          Zone.assertZonePatched();
          const o = this;
          if (
            ((o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.AsyncStackTaggingZoneSpec)
          ) {
            const i = Zone.AsyncStackTaggingZoneSpec;
            o._inner = o._inner.fork(new i("Angular"));
          }
          Zone.TaskTrackingZoneSpec &&
            (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function wM() {
              let e = ee.requestAnimationFrame,
                t = ee.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function bM(e) {
              const t = () => {
                !(function _M(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(ee, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Gl(e),
                                (e.isCheckStableRunning = !0),
                                zl(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Gl(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return iy(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      sy(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return iy(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), sy(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Gl(e),
                          zl(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!_e.isInAngularZone()) throw new b(909, !1);
        }
        static assertNotInAngularZone() {
          if (_e.isInAngularZone()) throw new b(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, CM, ws, ws);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const CM = {};
      function zl(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Gl(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function iy(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function sy(e) {
        e._nesting--, zl(e);
      }
      class EM {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ze()),
            (this.onMicrotaskEmpty = new ze()),
            (this.onStable = new ze()),
            (this.onError = new ze());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const ay = new P(""),
        bs = new P("");
      let Kl,
        Wl = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Kl ||
                  ((function IM(e) {
                    Kl = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      _e.assertNotInAngularZone(),
                        Ul(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Ul(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(_e), M(ql), M(bs));
            }),
            (e.ɵprov = L({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        ql = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return Kl?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = L({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })(),
        yn = null;
      const uy = new P("AllowMultipleToken"),
        Zl = new P("PlatformDestroyListeners");
      class ly {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function dy(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new P(r);
        return (i = []) => {
          let s = Ql();
          if (!s || s.injector.get(uy, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function TM(e) {
                  if (yn && !yn.get(uy, !1)) throw new b(400, !1);
                  yn = e;
                  const t = e.get(hy);
                  (function cy(e) {
                    const t = e.get(ey, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function fy(e = [], t) {
                    return Dt.create({
                      name: t,
                      providers: [
                        { provide: pu, useValue: "platform" },
                        { provide: Zl, useValue: new Set([() => (yn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function RM(e) {
            const t = Ql();
            if (!t) throw new b(401, !1);
            return t;
          })();
        };
      }
      function Ql() {
        return yn?.get(hy) ?? null;
      }
      let hy = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function gy(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new EM()
                      : ("zone.js" === e ? void 0 : e) || new _e(t)),
                  n
                );
              })(
                r?.ngZone,
                (function py(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              i = [{ provide: _e, useValue: o }];
            return o.run(() => {
              const s = Dt.create({
                  providers: i,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                a = n.create(s),
                u = a.injector.get(vr, null);
              if (!u) throw new b(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const l = o.onError.subscribe({
                    next: (c) => {
                      u.handleError(c);
                    },
                  });
                  a.onDestroy(() => {
                    Is(this._modules, a), l.unsubscribe();
                  });
                }),
                (function my(e, t, n) {
                  try {
                    const r = n();
                    return ls(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(u, o, () => {
                  const l = a.injector.get(_s);
                  return (
                    l.runInitializers(),
                    l.donePromise.then(
                      () => (
                        (function Hg(e) {
                          Je(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Bg = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(Xt, kr) || kr),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = yy({}, r);
            return (function SM(e, t, n) {
              const r = new El(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Es);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new b(403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new b(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(Zl, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Dt));
          }),
          (e.ɵprov = L({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function yy(e, t) {
        return Array.isArray(t) ? t.reduce(yy, e) : { ...e, ...t };
      }
      let Es = (() => {
        class e {
          constructor(n, r, o) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new ye((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new ye((a) => {
                let u;
                this._zone.runOutsideAngular(() => {
                  u = this._zone.onStable.subscribe(() => {
                    _e.assertNotInAngularZone(),
                      Ul(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const l = this._zone.onUnstable.subscribe(() => {
                  _e.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  u.unsubscribe(), l.unsubscribe();
                };
              });
            this.isStable = (function mw(...e) {
              const t = Qr(e),
                n = (function lw(e, t) {
                  return "number" == typeof va(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? Rt(r[0])
                  : Qn(n)(ve(r, t))
                : Bt;
            })(
              i,
              s.pipe(
                (function yw(e = {}) {
                  const {
                    connector: t = () => new At(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = e;
                  return (i) => {
                    let s,
                      a,
                      u,
                      l = 0,
                      c = !1,
                      d = !1;
                    const f = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      h = () => {
                        f(), (s = u = void 0), (c = d = !1);
                      },
                      p = () => {
                        const g = s;
                        h(), g?.unsubscribe();
                      };
                    return Ee((g, y) => {
                      l++, !d && !c && f();
                      const D = (u = u ?? t());
                      y.add(() => {
                        l--, 0 === l && !d && !c && (a = Da(p, o));
                      }),
                        D.subscribe(y),
                        !s &&
                          l > 0 &&
                          ((s = new Zr({
                            next: (w) => D.next(w),
                            error: (w) => {
                              (d = !0), f(), (a = Da(h, n, w)), D.error(w);
                            },
                            complete: () => {
                              (c = !0), f(), (a = Da(h, r)), D.complete();
                            },
                          })),
                          Rt(g).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const o = n instanceof uh;
            if (!this._injector.get(_s).done)
              throw (
                (!o &&
                  (function Xn(e) {
                    const t = Z(e) || je(e) || Ve(e);
                    return null !== t && t.standalone;
                  })(n),
                new b(405, false))
              );
            let s;
            (s = o ? n : this._injector.get(_o).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function MM(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Bn),
              l = s.create(Dt.NULL, [], r || s.selector, a),
              c = l.location.nativeElement,
              d = l.injector.get(ay, null);
            return (
              d?.registerApplication(c),
              l.onDestroy(() => {
                this.detachView(l.hostView),
                  Is(this.components, l),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(l),
              l
            );
          }
          tick() {
            if (this._runningTick) throw new b(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            Is(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(ny, [])
                .concat(this._bootstrapListeners)
                .forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => Is(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new b(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(_e), M(fn), M(vr));
          }),
          (e.ɵprov = L({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Is(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let Dy = !0,
        Yl = (() => {
          class e {}
          return (e.__NG_ELEMENT_ID__ = PM), e;
        })();
      function PM(e) {
        return (function OM(e, t, n) {
          if (wi(e) && !n) {
            const r = tt(e.index, t);
            return new So(r, r);
          }
          return 47 & e.type ? new So(t[16], t) : null;
        })(De(), v(), 16 == (16 & e));
      }
      class Ey {
        constructor() {}
        supports(t) {
          return To(t);
        }
        create(t) {
          return new $M(t);
        }
      }
      const VM = (e, t) => t;
      class $M {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || VM);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < Sy(r, o, i)) ? n : r,
              a = Sy(s, o, i),
              u = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const l = a - o,
                c = u - o;
              if (l != c) {
                for (let f = 0; f < l; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  c <= p && p < l && (i[f] = h + 1);
                }
                i[s.previousIndex] = c - l;
              }
            }
            a !== u && t(s, a, u);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !To(t))) throw new b(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (i = t[a]),
                (s = this._trackByFn(a, i)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, s, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function aE(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[jn()]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new BM(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Iy()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Iy()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class BM {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class HM {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class Iy {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new HM()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Sy(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      function Ty() {
        return new Ts([new Ey()]);
      }
      let Ts = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || Ty()),
              deps: [[e, new mo(), new go()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new b(901, !1);
          }
        }
        return (e.ɵprov = L({ token: e, providedIn: "root", factory: Ty })), e;
      })();
      const qM = dy(null, "core", []);
      let KM = (() => {
        class e {
          constructor(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Es));
          }),
          (e.ɵmod = An({ type: e })),
          (e.ɵinj = sn({})),
          e
        );
      })();
      function Vr(e) {
        return "boolean" == typeof e ? e : null != e && "false" !== e;
      }
      let As = null;
      function vn() {
        return As;
      }
      const Ze = new P("DocumentToken");
      let nc = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = L({
            token: e,
            factory: function () {
              return (function JM() {
                return M(Ry);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const XM = new P("Location Initialized");
      let Ry = (() => {
        class e extends nc {
          constructor(n) {
            super(), (this._doc = n), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return vn().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = vn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = vn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(n) {
            this.location.pathname = n;
          }
          pushState(n, r, o) {
            xy() ? this._history.pushState(n, r, o) : (this.location.hash = o);
          }
          replaceState(n, r, o) {
            xy()
              ? this._history.replaceState(n, r, o)
              : (this.location.hash = o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Ze));
          }),
          (e.ɵprov = L({
            token: e,
            factory: function () {
              return (function e1() {
                return new Ry(M(Ze));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function xy() {
        return !!window.history.pushState;
      }
      function rc(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function Ny(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function tn(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let Un = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = L({
            token: e,
            factory: function () {
              return de(Oy);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const Py = new P("appBaseHref");
      let Oy = (() => {
          class e extends Un {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  de(Ze).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return rc(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  tn(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + tn(i));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + tn(i));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(nc), M(Py, 8));
            }),
            (e.ɵprov = L({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        t1 = (() => {
          class e extends Un {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = rc(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + tn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + tn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(nc), M(Py, 8));
            }),
            (e.ɵprov = L({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        oc = (() => {
          class e {
            constructor(n) {
              (this._subject = new ze()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._baseHref = Ny(Fy(r))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + tn(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function r1(e, t) {
                  return e && t.startsWith(e) ? t.substring(e.length) : t;
                })(this._baseHref, Fy(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", o = null) {
              this._locationStrategy.pushState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + tn(r)),
                  o
                );
            }
            replaceState(n, r = "", o = null) {
              this._locationStrategy.replaceState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + tn(r)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((o) => o(n, r));
            }
            subscribe(n, r, o) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: o,
              });
            }
          }
          return (
            (e.normalizeQueryParams = tn),
            (e.joinWithSlash = rc),
            (e.stripTrailingSlash = Ny),
            (e.ɵfac = function (n) {
              return new (n || e)(M(Un));
            }),
            (e.ɵprov = L({
              token: e,
              factory: function () {
                return (function n1() {
                  return new oc(M(Un));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function Fy(e) {
        return e.replace(/\/index.html$/, "");
      }
      class U1 {
        constructor(t, n, r, o) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let Wy = (() => {
        class e {
          constructor(n, r, o) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new U1(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), qy(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((o) => {
              qy(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(E(Et), E(Jt), E(Ts));
          }),
          (e.ɵdir = xe({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          e
        );
      })();
      function qy(e, t) {
        e.context.$implicit = t.item;
      }
      let DT = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = An({ type: e })),
          (e.ɵinj = sn({})),
          e
        );
      })();
      let bT = (() => {
        class e {}
        return (
          (e.ɵprov = L({
            token: e,
            providedIn: "root",
            factory: () => new ET(M(Ze), window),
          })),
          e
        );
      })();
      class ET {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function IT(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              Jy(this.window.history) ||
              Jy(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function Jy(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class wc extends class zT extends class YM {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function QM(e) {
            As || (As = e);
          })(new wc());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function GT() {
            return (
              (zo = zo || document.querySelector("base")),
              zo ? zo.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function WT(e) {
                ($s = $s || document.createElement("a")),
                  $s.setAttribute("href", e);
                const t = $s.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          zo = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function $1(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const r = n.indexOf("="),
                [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (o.trim() === t) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let $s,
        zo = null;
      const nv = new P("TRANSITION_ID"),
        KT = [
          {
            provide: Cs,
            useFactory: function qT(e, t, n) {
              return () => {
                n.get(_s).donePromise.then(() => {
                  const r = vn(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [nv, Ze, Dt],
            multi: !0,
          },
        ];
      let QT = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = L({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Bs = new P("EventManagerPlugins");
      let Hs = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => (o.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Bs), M(_e));
          }),
          (e.ɵprov = L({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class rv {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = vn().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let ov = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const r = new Set();
              n.forEach((o) => {
                this._stylesSet.has(o) || (this._stylesSet.add(o), r.add(o));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = L({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Go = (() => {
          class e extends ov {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, r, o) {
              n.forEach((i) => {
                const s = this._doc.createElement("style");
                (s.textContent = i), o.push(r.appendChild(s));
              });
            }
            addHost(n) {
              const r = [];
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r);
            }
            removeHost(n) {
              const r = this._hostNodes.get(n);
              r && r.forEach(iv), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, o) => {
                this._addStylesToHost(n, o, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(iv));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Ze));
            }),
            (e.ɵprov = L({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      function iv(e) {
        vn().remove(e);
      }
      const Cc = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        _c = /%COMP%/g;
      function Us(e, t, n) {
        for (let r = 0; r < t.length; r++) {
          let o = t[r];
          Array.isArray(o) ? Us(e, o, n) : ((o = o.replace(_c, e)), n.push(o));
        }
        return n;
      }
      function uv(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let bc = (() => {
        class e {
          constructor(n, r, o) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Ec(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case xt.Emulated: {
                let o = this.rendererByCompId.get(r.id);
                return (
                  o ||
                    ((o = new nA(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, o)),
                  o.applyToHost(n),
                  o
                );
              }
              case 1:
              case xt.ShadowDom:
                return new rA(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const o = Us(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(o),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Hs), M(Go), M(Vo));
          }),
          (e.ɵprov = L({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Ec {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(Cc[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (cv(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (cv(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = Cc[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = Cc[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (Ke.DashCase | Ke.Important)
            ? t.style.setProperty(n, r, o & Ke.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & Ke.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, uv(r))
            : this.eventManager.addEventListener(t, n, uv(r));
        }
      }
      function cv(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class nA extends Ec {
        constructor(t, n, r, o) {
          super(t), (this.component = r);
          const i = Us(o + "-" + r.id, r.styles, []);
          n.addStyles(i),
            (this.contentAttr = (function XT(e) {
              return "_ngcontent-%COMP%".replace(_c, e);
            })(o + "-" + r.id)),
            (this.hostAttr = (function eA(e) {
              return "_nghost-%COMP%".replace(_c, e);
            })(o + "-" + r.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class rA extends Ec {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = Us(o.id, o.styles, []);
          for (let s = 0; s < i.length; s++) {
            const a = document.createElement("style");
            (a.textContent = i[s]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let oA = (() => {
        class e extends rv {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Ze));
          }),
          (e.ɵprov = L({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const dv = ["alt", "control", "meta", "shift"],
        iA = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        sA = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let aA = (() => {
        class e extends rv {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => vn().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              dv.forEach((l) => {
                const c = r.indexOf(l);
                c > -1 && (r.splice(c, 1), (s += l + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const u = {};
            return (u.domEventName = o), (u.fullKey = s), u;
          }
          static matchEventFullKeyCode(n, r) {
            let o = iA[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                dv.forEach((s) => {
                  s !== o && (0, sA[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Ze));
          }),
          (e.ɵprov = L({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const dA = dy(qM, "browser", [
          { provide: ty, useValue: "browser" },
          {
            provide: ey,
            useValue: function uA() {
              wc.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: Ze,
            useFactory: function cA() {
              return (
                (function t_(e) {
                  ru = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        pv = new P(""),
        gv = [
          {
            provide: bs,
            useClass: class ZT {
              addToWindow(t) {
                (ee.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i)
                    throw new Error("Could not find testability for element.");
                  return i;
                }),
                  (ee.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (ee.getAllAngularRootElements = () => t.getAllRootElements()),
                  ee.frameworkStabilizers || (ee.frameworkStabilizers = []),
                  ee.frameworkStabilizers.push((r) => {
                    const o = ee.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (u) {
                      (s = s || u), i--, 0 == i && r(s);
                    };
                    o.forEach(function (u) {
                      u.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? vn().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: ay, useClass: Wl, deps: [_e, ql, bs] },
          { provide: Wl, useClass: Wl, deps: [_e, ql, bs] },
        ],
        mv = [
          { provide: pu, useValue: "root" },
          {
            provide: vr,
            useFactory: function lA() {
              return new vr();
            },
            deps: [],
          },
          { provide: Bs, useClass: oA, multi: !0, deps: [Ze, _e, ty] },
          { provide: Bs, useClass: aA, multi: !0, deps: [Ze] },
          { provide: bc, useClass: bc, deps: [Hs, Go, Vo] },
          { provide: ch, useExisting: bc },
          { provide: ov, useExisting: Go },
          { provide: Go, useClass: Go, deps: [Ze] },
          { provide: Hs, useClass: Hs, deps: [Bs, _e] },
          { provide: class ST {}, useClass: QT, deps: [] },
          [],
        ];
      let fA = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: Vo, useValue: n.appId },
                  { provide: nv, useExisting: Vo },
                  KT,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(pv, 12));
            }),
            (e.ɵmod = An({ type: e })),
            (e.ɵinj = sn({ providers: [...mv, ...gv], imports: [DT, KM] })),
            e
          );
        })(),
        yv = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Ze));
            }),
            (e.ɵprov = L({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function pA() {
                        return new yv(M(Ze));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function S(...e) {
        return ve(e, Qr(e));
      }
      typeof window < "u" && window;
      class Tt extends At {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const zs = qr(
          (e) =>
            function () {
              e(this),
                (this.name = "EmptyError"),
                (this.message = "no elements in sequence");
            }
        ),
        { isArray: _A } = Array,
        { getPrototypeOf: bA, prototype: EA, keys: IA } = Object;
      const { isArray: TA } = Array;
      function wv(...e) {
        const t = Qr(e),
          n = (function uw(e) {
            return te(va(e)) ? e.pop() : void 0;
          })(e),
          { args: r, keys: o } = (function SA(e) {
            if (1 === e.length) {
              const t = e[0];
              if (_A(t)) return { args: t, keys: null };
              if (
                (function MA(e) {
                  return e && "object" == typeof e && bA(e) === EA;
                })(t)
              ) {
                const n = IA(t);
                return { args: n.map((r) => t[r]), keys: n };
              }
            }
            return { args: e, keys: null };
          })(e);
        if (0 === r.length) return ve([], t);
        const i = new ye(
          (function NA(e, t, n = Mn) {
            return (r) => {
              Cv(
                t,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let u = 0; u < o; u++)
                    Cv(
                      t,
                      () => {
                        const l = ve(e[u], t);
                        let c = !1;
                        l.subscribe(
                          Ie(
                            r,
                            (d) => {
                              (i[u] = d),
                                c || ((c = !0), a--),
                                a || r.next(n(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(
            r,
            t,
            o
              ? (s) =>
                  (function xA(e, t) {
                    return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
                  })(o, s)
              : Mn
          )
        );
        return n
          ? i.pipe(
              (function RA(e) {
                return G((t) =>
                  (function AA(e, t) {
                    return TA(t) ? e(...t) : e(t);
                  })(e, t)
                );
              })(n)
            )
          : i;
      }
      function Cv(e, t, n) {
        e ? $t(n, e, t) : t();
      }
      function Mc(...e) {
        return (function PA() {
          return Qn(1);
        })()(ve(e, Qr(e)));
      }
      function _v(e) {
        return new ye((t) => {
          Rt(e()).subscribe(t);
        });
      }
      function Wo(e, t) {
        const n = te(e) ? e : () => e,
          r = (o) => o.error(n());
        return new ye(t ? (o) => t.schedule(r, 0, o) : r);
      }
      function Tc() {
        return Ee((e, t) => {
          let n = null;
          e._refCount++;
          const r = Ie(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              i = n;
            (n = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class bv extends ye {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            _d(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new it();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                Ie(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = it.EMPTY));
          }
          return t;
        }
        refCount() {
          return Tc()(this);
        }
      }
      function jt(e, t) {
        return Ee((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            Ie(
              r,
              (u) => {
                o?.unsubscribe();
                let l = 0;
                const c = i++;
                Rt(e(u, c)).subscribe(
                  (o = Ie(
                    r,
                    (d) => r.next(t ? t(u, d, c, l++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function qo(e) {
        return e <= 0
          ? () => Bt
          : Ee((t, n) => {
              let r = 0;
              t.subscribe(
                Ie(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                })
              );
            });
      }
      function wn(e, t) {
        return Ee((n, r) => {
          let o = 0;
          n.subscribe(Ie(r, (i) => e.call(t, i, o++) && r.next(i)));
        });
      }
      function Gs(e) {
        return Ee((t, n) => {
          let r = !1;
          t.subscribe(
            Ie(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function Ev(e = FA) {
        return Ee((t, n) => {
          let r = !1;
          t.subscribe(
            Ie(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function FA() {
        return new zs();
      }
      function Cn(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? wn((o, i) => e(o, i, r)) : Mn,
            qo(1),
            n ? Gs(t) : Ev(() => new zs())
          );
      }
      function zn(e, t) {
        return te(t) ? Me(e, t, 1) : Me(e, 1);
      }
      function Le(e, t, n) {
        const r = te(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? Ee((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                Ie(
                  i,
                  (u) => {
                    var l;
                    null === (l = r.next) || void 0 === l || l.call(r, u),
                      i.next(u);
                  },
                  () => {
                    var u;
                    (a = !1),
                      null === (u = r.complete) || void 0 === u || u.call(r),
                      i.complete();
                  },
                  (u) => {
                    var l;
                    (a = !1),
                      null === (l = r.error) || void 0 === l || l.call(r, u),
                      i.error(u);
                  },
                  () => {
                    var u, l;
                    a &&
                      (null === (u = r.unsubscribe) ||
                        void 0 === u ||
                        u.call(r)),
                      null === (l = r.finalize) || void 0 === l || l.call(r);
                  }
                )
              );
            })
          : Mn;
      }
      function _n(e) {
        return Ee((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            Ie(n, void 0, void 0, (s) => {
              (i = Rt(e(s, _n(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function kA(e, t, n, r, o) {
        return (i, s) => {
          let a = n,
            u = t,
            l = 0;
          i.subscribe(
            Ie(
              s,
              (c) => {
                const d = l++;
                (u = a ? e(u, c, d) : ((a = !0), c)), r && s.next(u);
              },
              o &&
                (() => {
                  a && s.next(u), s.complete();
                })
            )
          );
        };
      }
      function Iv(e, t) {
        return Ee(kA(e, t, arguments.length >= 2, !0));
      }
      function Ac(e) {
        return e <= 0
          ? () => Bt
          : Ee((t, n) => {
              let r = [];
              t.subscribe(
                Ie(
                  n,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function Sv(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? wn((o, i) => e(o, i, r)) : Mn,
            Ac(1),
            n ? Gs(t) : Ev(() => new zs())
          );
      }
      function Rc(e) {
        return Ee((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const $ = "primary",
        Ko = Symbol("RouteTitle");
      class VA {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function $r(e) {
        return new VA(e);
      }
      function $A(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function Vt(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !Mv(e[o], t[o]))) return !1;
        return !0;
      }
      function Mv(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function Tv(e) {
        return Array.prototype.concat.apply([], e);
      }
      function Av(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Ae(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function bn(e) {
        return Wp(e) ? e : ls(e) ? ve(Promise.resolve(e)) : S(e);
      }
      const UA = {
          exact: function Nv(e, t, n) {
            if (
              !Wn(e.segments, t.segments) ||
              !Ws(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !Nv(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: Pv,
        },
        Rv = {
          exact: function zA(e, t) {
            return Vt(e, t);
          },
          subset: function GA(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => Mv(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function xv(e, t, n) {
        return (
          UA[n.paths](e.root, t.root, n.matrixParams) &&
          Rv[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function Pv(e, t, n) {
        return Ov(e, t, t.segments, n);
      }
      function Ov(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!Wn(o, n) || t.hasChildren() || !Ws(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!Wn(e.segments, n) || !Ws(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !Pv(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(Wn(e.segments, o) && Ws(e.segments, o, r) && e.children[$]) &&
            Ov(e.children[$], t, i, r)
          );
        }
      }
      function Ws(e, t, n) {
        return t.every((r, o) => Rv[n](e[o].parameters, r.parameters));
      }
      class Gn {
        constructor(t, n, r) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = $r(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return KA.serialize(this);
        }
      }
      class B {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Ae(n, (r, o) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return qs(this);
        }
      }
      class Zo {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = $r(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return jv(this);
        }
      }
      function Wn(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let Fv = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = L({
            token: e,
            factory: function () {
              return new Nc();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class Nc {
        parse(t) {
          const n = new rR(t);
          return new Gn(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${Qo(t.root, !0)}`,
            r = (function YA(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${Ks(n)}=${Ks(o)}`).join("&")
                    : `${Ks(n)}=${Ks(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function ZA(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const KA = new Nc();
      function qs(e) {
        return e.segments.map((t) => jv(t)).join("/");
      }
      function Qo(e, t) {
        if (!e.hasChildren()) return qs(e);
        if (t) {
          const n = e.children[$] ? Qo(e.children[$], !1) : "",
            r = [];
          return (
            Ae(e.children, (o, i) => {
              i !== $ && r.push(`${i}:${Qo(o, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function qA(e, t) {
            let n = [];
            return (
              Ae(e.children, (r, o) => {
                o === $ && (n = n.concat(t(r, o)));
              }),
              Ae(e.children, (r, o) => {
                o !== $ && (n = n.concat(t(r, o)));
              }),
              n
            );
          })(e, (r, o) =>
            o === $ ? [Qo(e.children[$], !1)] : [`${o}:${Qo(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[$]
            ? `${qs(e)}/${n[0]}`
            : `${qs(e)}/(${n.join("//")})`;
        }
      }
      function kv(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Ks(e) {
        return kv(e).replace(/%3B/gi, ";");
      }
      function Pc(e) {
        return kv(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Zs(e) {
        return decodeURIComponent(e);
      }
      function Lv(e) {
        return Zs(e.replace(/\+/g, "%20"));
      }
      function jv(e) {
        return `${Pc(e.path)}${(function QA(e) {
          return Object.keys(e)
            .map((t) => `;${Pc(t)}=${Pc(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const JA = /^[^\/()?;=#]+/;
      function Qs(e) {
        const t = e.match(JA);
        return t ? t[0] : "";
      }
      const XA = /^[^=?&#]+/,
        tR = /^[^&#]+/;
      class rR {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new B([], {})
              : new B([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[$] = new B(t, n)),
            r
          );
        }
        parseSegment() {
          const t = Qs(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new b(4009, !1);
          return this.capture(t), new Zo(Zs(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = Qs(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = Qs(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[Zs(n)] = Zs(r);
        }
        parseQueryParam(t) {
          const n = (function eR(e) {
            const t = e.match(XA);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function nR(e) {
              const t = e.match(tR);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = Lv(n),
            i = Lv(r);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = Qs(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new b(4010, !1);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = $);
            const s = this.parseChildren();
            (n[i] = 1 === Object.keys(s).length ? s[$] : new B([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new b(4011, !1);
        }
      }
      function Oc(e) {
        return e.segments.length > 0 ? new B([], { [$]: e }) : e;
      }
      function Ys(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = Ys(e.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function oR(e) {
          if (1 === e.numberOfChildren && e.children[$]) {
            const t = e.children[$];
            return new B(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new B(e.segments, t));
      }
      function qn(e) {
        return e instanceof Gn;
      }
      function aR(e, t, n, r, o) {
        if (0 === n.length) return Br(t.root, t.root, t.root, r, o);
        const i = (function Bv(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new $v(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  Ae(i.outlets, (u, l) => {
                    a[l] = "string" == typeof u ? u.split("/") : u;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, u) => {
                  (0 == u && "." === a) ||
                    (0 == u && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new $v(n, t, r);
        })(n);
        return i.toRoot()
          ? Br(t.root, t.root, new B([], {}), r, o)
          : (function s(u) {
              const l = (function lR(e, t, n, r) {
                  if (e.isAbsolute) return new Hr(t.root, !0, 0);
                  if (-1 === r) return new Hr(n, n === t.root, 0);
                  return (function Hv(e, t, n) {
                    let r = e,
                      o = t,
                      i = n;
                    for (; i > o; ) {
                      if (((i -= o), (r = r.parent), !r)) throw new b(4005, !1);
                      o = r.segments.length;
                    }
                    return new Hr(r, !1, o - i);
                  })(n, r + (Yo(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
                })(i, t, e.snapshot?._urlSegment, u),
                c = l.processChildren
                  ? Xo(l.segmentGroup, l.index, i.commands)
                  : kc(l.segmentGroup, l.index, i.commands);
              return Br(t.root, l.segmentGroup, c, r, o);
            })(e.snapshot?._lastPathIndex);
      }
      function Yo(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function Jo(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function Br(e, t, n, r, o) {
        let s,
          i = {};
        r &&
          Ae(r, (u, l) => {
            i[l] = Array.isArray(u) ? u.map((c) => `${c}`) : `${u}`;
          }),
          (s = e === t ? n : Vv(e, t, n));
        const a = Oc(Ys(s));
        return new Gn(a, i, o);
      }
      function Vv(e, t, n) {
        const r = {};
        return (
          Ae(e.children, (o, i) => {
            r[i] = o === t ? n : Vv(o, t, n);
          }),
          new B(e.segments, r)
        );
      }
      class $v {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && Yo(r[0]))
          )
            throw new b(4003, !1);
          const o = r.find(Jo);
          if (o && o !== Av(r)) throw new b(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Hr {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function kc(e, t, n) {
        if (
          (e || (e = new B([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return Xo(e, t, n);
        const r = (function dR(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (Jo(a)) break;
              const u = `${a}`,
                l = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === u) break;
              if (u && l && "object" == typeof l && void 0 === l.outlets) {
                if (!zv(u, l, s)) return i;
                r += 2;
              } else {
                if (!zv(u, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new B(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[$] = new B(e.segments.slice(r.pathIndex), e.children)),
            Xo(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new B(e.segments, {})
          : r.match && !e.hasChildren()
          ? Lc(e, t, n)
          : r.match
          ? Xo(e, 0, o)
          : Lc(e, t, n);
      }
      function Xo(e, t, n) {
        if (0 === n.length) return new B(e.segments, {});
        {
          const r = (function cR(e) {
              return Jo(e[0]) ? e[0].outlets : { [$]: e };
            })(n),
            o = {};
          return (
            Ae(r, (i, s) => {
              "string" == typeof i && (i = [i]),
                null !== i && (o[s] = kc(e.children[s], t, i));
            }),
            Ae(e.children, (i, s) => {
              void 0 === r[s] && (o[s] = i);
            }),
            new B(e.segments, o)
          );
        }
      }
      function Lc(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (Jo(i)) {
            const u = fR(i.outlets);
            return new B(r, u);
          }
          if (0 === o && Yo(n[0])) {
            r.push(new Zo(e.segments[t].path, Uv(n[0]))), o++;
            continue;
          }
          const s = Jo(i) ? i.outlets[$] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && Yo(a)
            ? (r.push(new Zo(s, Uv(a))), (o += 2))
            : (r.push(new Zo(s, {})), o++);
        }
        return new B(r, {});
      }
      function fR(e) {
        const t = {};
        return (
          Ae(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = Lc(new B([], {}), 0, n));
          }),
          t
        );
      }
      function Uv(e) {
        const t = {};
        return Ae(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function zv(e, t, n) {
        return e == n.path && Vt(t, n.parameters);
      }
      class rn {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class jc extends rn {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Kn extends rn {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Js extends rn {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Gv extends rn {
        constructor(t, n, r, o) {
          super(t, n), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class hR extends rn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class pR extends rn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class gR extends rn {
        constructor(t, n, r, o, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class mR extends rn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class yR extends rn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class vR {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class DR {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class wR {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class CR {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class _R {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class bR {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Wv {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class qv {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = Vc(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = Vc(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = $c(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return $c(t, this._root).map((n) => n.value);
        }
      }
      function Vc(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = Vc(e, n);
          if (r) return r;
        }
        return null;
      }
      function $c(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = $c(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class on {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Ur(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class Kv extends qv {
        constructor(t, n) {
          super(t), (this.snapshot = n), Bc(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Zv(e, t) {
        const n = (function IR(e, t) {
            const s = new Xs([], {}, {}, "", {}, $, t, null, e.root, -1, {});
            return new Yv("", new on(s, []));
          })(e, t),
          r = new Tt([new Zo("", {})]),
          o = new Tt({}),
          i = new Tt({}),
          s = new Tt({}),
          a = new Tt(""),
          u = new En(r, o, s, a, i, $, t, n.root);
        return (u.snapshot = n.root), new Kv(new on(u, []), n);
      }
      class En {
        constructor(t, n, r, o, i, s, a, u) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.pipe(G((l) => l[Ko])) ?? S(void 0)),
            (this._futureSnapshot = u);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(G((t) => $r(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(G((t) => $r(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function Qv(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const o = n[r],
              i = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function SR(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Xs {
        constructor(t, n, r, o, i, s, a, u, l, c, d, f) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.[Ko]),
            (this.routeConfig = u),
            (this._urlSegment = l),
            (this._lastPathIndex = c),
            (this._correctedLastPathIndex = f ?? c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = $r(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = $r(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class Yv extends qv {
        constructor(t, n) {
          super(n), (this.url = t), Bc(this, n);
        }
        toString() {
          return Jv(this._root);
        }
      }
      function Bc(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => Bc(e, n));
      }
      function Jv(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(Jv).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function Hc(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            Vt(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            Vt(t.params, n.params) || e.params.next(n.params),
            (function BA(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!Vt(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            Vt(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function Uc(e, t) {
        const n =
          Vt(e.params, t.params) &&
          (function WA(e, t) {
            return (
              Wn(e, t) && e.every((n, r) => Vt(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || Uc(e.parent, t.parent))
        );
      }
      function ei(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function TR(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return ei(e, r, o);
              return ei(e, r);
            });
          })(e, t, n);
          return new on(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => ei(e, a))),
                s
              );
            }
          }
          const r = (function AR(e) {
              return new En(
                new Tt(e.url),
                new Tt(e.params),
                new Tt(e.queryParams),
                new Tt(e.fragment),
                new Tt(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            o = t.children.map((i) => ei(e, i));
          return new on(r, o);
        }
      }
      const zc = "ngNavigationCancelingError";
      function Xv(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = qn(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          o = eD(!1, 0, t);
        return (o.url = n), (o.navigationBehaviorOptions = r), o;
      }
      function eD(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[zc] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function tD(e) {
        return nD(e) && qn(e.url);
      }
      function nD(e) {
        return e && e[zc];
      }
      class RR {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new ti()),
            (this.attachRef = null);
        }
      }
      let ti = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const o = this.getOrCreateContext(n);
            (o.outlet = r), this.contexts.set(n, o);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new RR()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = L({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const ea = !1;
      let Gc = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.parentContexts = n),
              (this.location = r),
              (this.changeDetector = i),
              (this.environmentInjector = s),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new ze()),
              (this.deactivateEvents = new ze()),
              (this.attachEvents = new ze()),
              (this.detachEvents = new ze()),
              (this.name = o || $),
              n.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.getContext(this.name)?.outlet === this &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const n = this.parentContexts.getContext(this.name);
              n &&
                n.route &&
                (n.attachRef
                  ? this.attach(n.attachRef, n.route)
                  : this.activateWith(n.route, n.injector));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new b(4012, ea);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new b(4012, ea);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new b(4012, ea);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new b(4013, ea);
            this._activatedRoute = n;
            const o = this.location,
              s = n._futureSnapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              u = new xR(n, a, o.injector);
            if (
              r &&
              (function NR(e) {
                return !!e.resolveComponentFactory;
              })(r)
            ) {
              const l = r.resolveComponentFactory(s);
              this.activated = o.createComponent(l, o.length, u);
            } else
              this.activated = o.createComponent(s, {
                index: o.length,
                injector: u,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(
              E(ti),
              E(Et),
              (function ao(e) {
                return (function bC(e, t) {
                  if ("class" === t) return e.classes;
                  if ("style" === t) return e.styles;
                  const n = e.attrs;
                  if (n) {
                    const r = n.length;
                    let o = 0;
                    for (; o < r; ) {
                      const i = n[o];
                      if (pf(i)) break;
                      if (0 === i) o += 2;
                      else if ("number" == typeof i)
                        for (o++; o < r && "string" == typeof n[o]; ) o++;
                      else {
                        if (i === t) return n[o + 1];
                        o += 2;
                      }
                    }
                  }
                  return null;
                })(De(), e);
              })("name"),
              E(Yl),
              E(fn)
            );
          }),
          (e.ɵdir = xe({
            type: e,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
          })),
          e
        );
      })();
      class xR {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === En
            ? this.route
            : t === ti
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let Wc = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Jn({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [gm],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && ss(0, "router-outlet");
            },
            dependencies: [Gc],
            encapsulation: 2,
          })),
          e
        );
      })();
      function rD(e, t) {
        return (
          e.providers &&
            !e._injector &&
            (e._injector = ys(e.providers, t, `Route: ${e.path}`)),
          e._injector ?? t
        );
      }
      function Kc(e) {
        const t = e.children && e.children.map(Kc),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== $ &&
            (n.component = Wc),
          n
        );
      }
      function ht(e) {
        return e.outlet || $;
      }
      function oD(e, t) {
        const n = e.filter((r) => ht(r) === t);
        return n.push(...e.filter((r) => ht(r) !== t)), n;
      }
      function ni(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class LR {
        constructor(t, n, r, o) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            Hc(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = Ur(n);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            Ae(o, (i, s) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = Ur(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = Ur(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            r.outlet &&
            (r.outlet.deactivate(),
            r.children.onOutletDeactivated(),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = Ur(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new bR(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new CR(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((Hc(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Hc(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = ni(o.snapshot),
                u = a?.get(_o) ?? null;
              (s.attachRef = null),
                (s.route = o),
                (s.resolver = u),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class iD {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class ta {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function jR(e, t, n) {
        const r = e._root;
        return ri(r, t ? t._root : null, n, [r.value]);
      }
      function zr(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function Ew(e) {
              return null !== pi(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function ri(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = Ur(t);
        return (
          e.children.forEach((s) => {
            (function $R(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const u = (function BR(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !Wn(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Wn(e.url, t.url) || !Vt(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Uc(e, t) || !Vt(e.queryParams, t.queryParams);
                    default:
                      return !Uc(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                u
                  ? o.canActivateChecks.push(new iD(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  ri(e, t, i.component ? (a ? a.children : null) : n, r, o),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new ta(a.outlet.component, s));
              } else
                s && oi(t, a, o),
                  o.canActivateChecks.push(new iD(r)),
                  ri(e, null, i.component ? (a ? a.children : null) : n, r, o);
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Ae(i, (s, a) => oi(s, n.getContext(a), o)),
          o
        );
      }
      function oi(e, t, n) {
        const r = Ur(e),
          o = e.value;
        Ae(r, (i, s) => {
          oi(i, o.component ? (t ? t.children.getContext(s) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new ta(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      function ii(e) {
        return "function" == typeof e;
      }
      function Zc(e) {
        return e instanceof zs || "EmptyError" === e?.name;
      }
      const na = Symbol("INITIAL_VALUE");
      function Gr() {
        return jt((e) =>
          wv(
            e.map((t) =>
              t.pipe(
                qo(1),
                (function OA(...e) {
                  const t = Qr(e);
                  return Ee((n, r) => {
                    (t ? Mc(e, n, t) : Mc(e, n)).subscribe(r);
                  });
                })(na)
              )
            )
          ).pipe(
            G((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === na) return na;
                  if (!1 === n || n instanceof Gn) return n;
                }
              return !0;
            }),
            wn((t) => t !== na),
            qo(1)
          )
        );
      }
      function sD(e) {
        return (function HD(...e) {
          return Dd(e);
        })(
          Le((t) => {
            if (qn(t)) throw Xv(0, t);
          }),
          G((t) => !0 === t)
        );
      }
      const Qc = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function aD(e, t, n, r, o) {
        const i = Yc(e, t, n);
        return i.matched
          ? (function ox(e, t, n, r) {
              const o = t.canMatch;
              return o && 0 !== o.length
                ? S(
                    o.map((s) => {
                      const a = zr(s, e);
                      return bn(
                        (function qR(e) {
                          return e && ii(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(Gr(), sD())
                : S(!0);
            })((r = rD(t, r)), t, n).pipe(G((s) => (!0 === s ? i : { ...Qc })))
          : S(i);
      }
      function Yc(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...Qc }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || $A)(n, e, t);
        if (!o) return { ...Qc };
        const i = {};
        Ae(o.posParams, (a, u) => {
          i[u] = a.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: n.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function ra(e, t, n, r, o = "corrected") {
        if (
          n.length > 0 &&
          (function ax(e, t, n) {
            return n.some((r) => oa(e, t, r) && ht(r) !== $);
          })(e, n, r)
        ) {
          const s = new B(
            t,
            (function sx(e, t, n, r) {
              const o = {};
              (o[$] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const i of n)
                if ("" === i.path && ht(i) !== $) {
                  const s = new B([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = t.length),
                    (o[ht(i)] = s);
                }
              return o;
            })(e, t, r, new B(n, e.children))
          );
          return (
            (s._sourceSegment = e),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function ux(e, t, n) {
            return n.some((r) => oa(e, t, r));
          })(e, n, r)
        ) {
          const s = new B(
            e.segments,
            (function ix(e, t, n, r, o, i) {
              const s = {};
              for (const a of r)
                if (oa(e, n, a) && !o[ht(a)]) {
                  const u = new B([], {});
                  (u._sourceSegment = e),
                    (u._segmentIndexShift =
                      "legacy" === i ? e.segments.length : t.length),
                    (s[ht(a)] = u);
                }
              return { ...o, ...s };
            })(e, t, n, r, e.children, o)
          );
          return (
            (s._sourceSegment = e),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: n }
          );
        }
        const i = new B(e.segments, e.children);
        return (
          (i._sourceSegment = e),
          (i._segmentIndexShift = t.length),
          { segmentGroup: i, slicedSegments: n }
        );
      }
      function oa(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function uD(e, t, n, r) {
        return (
          !!(ht(e) === r || (r !== $ && oa(t, n, e))) &&
          ("**" === e.path || Yc(t, e, n).matched)
        );
      }
      function lD(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      const ia = !1;
      class sa {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class cD {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function si(e) {
        return Wo(new sa(e));
      }
      function dD(e) {
        return Wo(new cD(e));
      }
      class fx {
        constructor(t, n, r, o, i) {
          (this.injector = t),
            (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = o),
            (this.config = i),
            (this.allowRedirects = !0);
        }
        apply() {
          const t = ra(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new B(t.segments, t.children);
          return this.expandSegmentGroup(this.injector, this.config, n, $)
            .pipe(
              G((i) =>
                this.createUrlTree(
                  Ys(i),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              _n((i) => {
                if (i instanceof cD)
                  return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof sa ? this.noMatchError(i) : i;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, $)
            .pipe(
              G((o) => this.createUrlTree(Ys(o), t.queryParams, t.fragment))
            )
            .pipe(
              _n((o) => {
                throw o instanceof sa ? this.noMatchError(o) : o;
              })
            );
        }
        noMatchError(t) {
          return new b(4002, ia);
        }
        createUrlTree(t, n, r) {
          const o = Oc(t);
          return new Gn(o, n, r);
        }
        expandSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(G((i) => new B([], i)))
            : this.expandSegment(t, r, n, r.segments, o, !0);
        }
        expandChildren(t, n, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return ve(o).pipe(
            zn((i) => {
              const s = r.children[i],
                a = oD(n, i);
              return this.expandSegmentGroup(t, a, s, i).pipe(
                G((u) => ({ segment: u, outlet: i }))
              );
            }),
            Iv((i, s) => ((i[s.outlet] = s.segment), i), {}),
            Sv()
          );
        }
        expandSegment(t, n, r, o, i, s) {
          return ve(r).pipe(
            zn((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, o, i, s).pipe(
                _n((l) => {
                  if (l instanceof sa) return S(null);
                  throw l;
                })
              )
            ),
            Cn((a) => !!a),
            _n((a, u) => {
              if (Zc(a)) return lD(n, o, i) ? S(new B([], {})) : si(n);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, o, i, s, a) {
          return uD(o, n, i, s)
            ? void 0 === o.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, o, i, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s)
              : si(n)
            : si(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
          const i = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? dD(i)
            : this.lineralizeSegments(r, i).pipe(
                Me((s) => {
                  const a = new B(s, {});
                  return this.expandSegment(t, a, n, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: u,
            remainingSegments: l,
            positionalParamSegments: c,
          } = Yc(n, o, i);
          if (!a) return si(n);
          const d = this.applyRedirectCommands(u, o.redirectTo, c);
          return o.redirectTo.startsWith("/")
            ? dD(d)
            : this.lineralizeSegments(o, d).pipe(
                Me((f) => this.expandSegment(t, n, r, f.concat(l), s, !1))
              );
        }
        matchSegmentAgainstRoute(t, n, r, o, i) {
          return "**" === r.path
            ? ((t = rD(r, t)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? S({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(t, r)
                  ).pipe(
                    G(
                      (a) => (
                        (r._loadedRoutes = a.routes),
                        (r._loadedInjector = a.injector),
                        new B(o, {})
                      )
                    )
                  )
                : S(new B(o, {})))
            : aD(n, r, o, t).pipe(
                jt(
                  ({ matched: s, consumedSegments: a, remainingSegments: u }) =>
                    s
                      ? this.getChildConfig((t = r._injector ?? t), r, o).pipe(
                          Me((c) => {
                            const d = c.injector ?? t,
                              f = c.routes,
                              { segmentGroup: h, slicedSegments: p } = ra(
                                n,
                                a,
                                u,
                                f
                              ),
                              g = new B(h.segments, h.children);
                            if (0 === p.length && g.hasChildren())
                              return this.expandChildren(d, f, g).pipe(
                                G((m) => new B(a, m))
                              );
                            if (0 === f.length && 0 === p.length)
                              return S(new B(a, {}));
                            const y = ht(r) === i;
                            return this.expandSegment(
                              d,
                              g,
                              f,
                              p,
                              y ? $ : i,
                              !0
                            ).pipe(
                              G((w) => new B(a.concat(w.segments), w.children))
                            );
                          })
                        )
                      : si(n)
                )
              );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? S({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? S({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function rx(e, t, n, r) {
                  const o = t.canLoad;
                  return void 0 === o || 0 === o.length
                    ? S(!0)
                    : S(
                        o.map((s) => {
                          const a = zr(s, e);
                          return bn(
                            (function UR(e) {
                              return e && ii(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(Gr(), sD());
                })(t, n, r).pipe(
                  Me((o) =>
                    o
                      ? this.configLoader.loadChildren(t, n).pipe(
                          Le((i) => {
                            (n._loadedRoutes = i.routes),
                              (n._loadedInjector = i.injector);
                          })
                        )
                      : (function cx(e) {
                          return Wo(eD(ia, 3));
                        })()
                  )
                )
            : S({ routes: [], injector: t });
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return S(r);
            if (o.numberOfChildren > 1 || !o.children[$])
              return Wo(new b(4e3, ia));
            o = o.children[$];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
          const i = this.createSegmentGroup(t, n.root, r, o);
          return new Gn(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Ae(t, (o, i) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                r[i] = n[a];
              } else r[i] = o;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const i = this.createSegments(t, n.segments, r, o);
          let s = {};
          return (
            Ae(n.children, (a, u) => {
              s[u] = this.createSegmentGroup(t, a, r, o);
            }),
            new B(i, s)
          );
        }
        createSegments(t, n, r, o) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o) throw new b(4001, ia);
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      class px {}
      class yx {
        constructor(t, n, r, o, i, s, a, u) {
          (this.injector = t),
            (this.rootComponentType = n),
            (this.config = r),
            (this.urlTree = o),
            (this.url = i),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = a),
            (this.urlSerializer = u);
        }
        recognize() {
          const t = ra(
            this.urlTree.root,
            [],
            [],
            this.config.filter((n) => void 0 === n.redirectTo),
            this.relativeLinkResolution
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            $
          ).pipe(
            G((n) => {
              if (null === n) return null;
              const r = new Xs(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  $,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                o = new on(r, n),
                i = new Yv(this.url, o);
              return this.inheritParamsAndData(i._root), i;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = Qv(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, o);
        }
        processChildren(t, n, r) {
          return ve(Object.keys(r.children)).pipe(
            zn((o) => {
              const i = r.children[o],
                s = oD(n, o);
              return this.processSegmentGroup(t, s, i, o);
            }),
            Iv((o, i) => (o && i ? (o.push(...i), o) : null)),
            (function LA(e, t = !1) {
              return Ee((n, r) => {
                let o = 0;
                n.subscribe(
                  Ie(r, (i) => {
                    const s = e(i, o++);
                    (s || t) && r.next(i), !s && r.complete();
                  })
                );
              });
            })((o) => null !== o),
            Gs(null),
            Sv(),
            G((o) => {
              if (null === o) return null;
              const i = fD(o);
              return (
                (function vx(e) {
                  e.sort((t, n) =>
                    t.value.outlet === $
                      ? -1
                      : n.value.outlet === $
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(i),
                i
              );
            })
          );
        }
        processSegment(t, n, r, o, i) {
          return ve(n).pipe(
            zn((s) =>
              this.processSegmentAgainstRoute(s._injector ?? t, s, r, o, i)
            ),
            Cn((s) => !!s),
            _n((s) => {
              if (Zc(s)) return lD(r, o, i) ? S([]) : S(null);
              throw s;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, o, i) {
          if (n.redirectTo || !uD(n, r, o, i)) return S(null);
          let s;
          if ("**" === n.path) {
            const a = o.length > 0 ? Av(o).parameters : {},
              u = pD(r) + o.length;
            s = S({
              snapshot: new Xs(
                o,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                mD(n),
                ht(n),
                n.component ?? n._loadedComponent ?? null,
                n,
                hD(r),
                u,
                yD(n),
                u
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            s = aD(r, n, o, t).pipe(
              G(
                ({
                  matched: a,
                  consumedSegments: u,
                  remainingSegments: l,
                  parameters: c,
                }) => {
                  if (!a) return null;
                  const d = pD(r) + u.length;
                  return {
                    snapshot: new Xs(
                      u,
                      c,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      mD(n),
                      ht(n),
                      n.component ?? n._loadedComponent ?? null,
                      n,
                      hD(r),
                      d,
                      yD(n),
                      d
                    ),
                    consumedSegments: u,
                    remainingSegments: l,
                  };
                }
              )
            );
          return s.pipe(
            jt((a) => {
              if (null === a) return S(null);
              const {
                snapshot: u,
                consumedSegments: l,
                remainingSegments: c,
              } = a;
              t = n._injector ?? t;
              const d = n._loadedInjector ?? t,
                f = (function Dx(e) {
                  return e.children
                    ? e.children
                    : e.loadChildren
                    ? e._loadedRoutes
                    : [];
                })(n),
                { segmentGroup: h, slicedSegments: p } = ra(
                  r,
                  l,
                  c,
                  f.filter((y) => void 0 === y.redirectTo),
                  this.relativeLinkResolution
                );
              if (0 === p.length && h.hasChildren())
                return this.processChildren(d, f, h).pipe(
                  G((y) => (null === y ? null : [new on(u, y)]))
                );
              if (0 === f.length && 0 === p.length) return S([new on(u, [])]);
              const g = ht(n) === i;
              return this.processSegment(d, f, h, p, g ? $ : i).pipe(
                G((y) => (null === y ? null : [new on(u, y)]))
              );
            })
          );
        }
      }
      function wx(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function fD(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!wx(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = fD(r.children);
          t.push(new on(r.value, o));
        }
        return t.filter((r) => !n.has(r));
      }
      function hD(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function pD(e) {
        let t = e,
          n = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment), (n += t._segmentIndexShift ?? 0);
        return n - 1;
      }
      function mD(e) {
        return e.data || {};
      }
      function yD(e) {
        return e.resolve || {};
      }
      function vD(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function Jc(e) {
        return jt((t) => {
          const n = e(t);
          return n ? ve(n).pipe(G(() => t)) : S(t);
        });
      }
      let DD = (() => {
          class e {
            buildTitle(n) {
              let r,
                o = n.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((i) => i.outlet === $));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[Ko];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = L({
              token: e,
              factory: function () {
                return de(wD);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        wD = (() => {
          class e extends DD {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(yv));
            }),
            (e.ɵprov = L({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      class Tx {}
      class Rx extends class Ax {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      } {}
      const ua = new P("", { providedIn: "root", factory: () => ({}) }),
        Xc = new P("ROUTES");
      let ed = (() => {
        class e {
          constructor(n, r) {
            (this.injector = n),
              (this.compiler = r),
              (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap());
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return S(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = bn(n.loadComponent()).pipe(
                Le((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = i);
                }),
                Rc(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              o = new bv(r, () => new At()).pipe(Tc());
            return this.componentLoaders.set(n, o), o;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return S({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                G((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let u,
                    l,
                    c = !1;
                  Array.isArray(a)
                    ? (l = a)
                    : ((u = a.create(n).injector),
                      (l = Tv(u.get(Xc, [], A.Self | A.Optional))));
                  return { routes: l.map(Kc), injector: u };
                }),
                Rc(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new bv(i, () => new At()).pipe(Tc());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(n) {
            return bn(n()).pipe(
              Me((r) =>
                r instanceof hm || Array.isArray(r)
                  ? S(r)
                  : ve(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Dt), M(Hl));
          }),
          (e.ɵprov = L({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class Nx {}
      class Px {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, n) {
          return t;
        }
      }
      function Ox(e) {
        throw e;
      }
      function Fx(e, t, n) {
        return t.parse("/");
      }
      const kx = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        Lx = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      function _D() {
        const e = de(Fv),
          t = de(ti),
          n = de(oc),
          r = de(Dt),
          o = de(Hl),
          i = de(Xc, { optional: !0 }) ?? [],
          s = de(ua, { optional: !0 }) ?? {},
          a = de(wD),
          u = de(DD, { optional: !0 }),
          l = de(Nx, { optional: !0 }),
          c = de(Tx, { optional: !0 }),
          d = new Re(null, e, t, n, r, o, Tv(i));
        return (
          l && (d.urlHandlingStrategy = l),
          c && (d.routeReuseStrategy = c),
          (d.titleStrategy = u ?? a),
          (function jx(e, t) {
            e.errorHandler && (t.errorHandler = e.errorHandler),
              e.malformedUriErrorHandler &&
                (t.malformedUriErrorHandler = e.malformedUriErrorHandler),
              e.onSameUrlNavigation &&
                (t.onSameUrlNavigation = e.onSameUrlNavigation),
              e.paramsInheritanceStrategy &&
                (t.paramsInheritanceStrategy = e.paramsInheritanceStrategy),
              e.relativeLinkResolution &&
                (t.relativeLinkResolution = e.relativeLinkResolution),
              e.urlUpdateStrategy &&
                (t.urlUpdateStrategy = e.urlUpdateStrategy),
              e.canceledNavigationResolution &&
                (t.canceledNavigationResolution =
                  e.canceledNavigationResolution);
          })(s, d),
          d
        );
      }
      let Re = (() => {
        class e {
          constructor(n, r, o, i, s, a, u) {
            (this.rootComponentType = n),
              (this.urlSerializer = r),
              (this.rootContexts = o),
              (this.location = i),
              (this.config = u),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new At()),
              (this.errorHandler = Ox),
              (this.malformedUriErrorHandler = Fx),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.afterPreactivation = () => S(void 0)),
              (this.urlHandlingStrategy = new Px()),
              (this.routeReuseStrategy = new Rx()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "corrected"),
              (this.canceledNavigationResolution = "replace"),
              (this.configLoader = s.get(ed)),
              (this.configLoader.onLoadEndListener = (f) =>
                this.triggerEvent(new DR(f))),
              (this.configLoader.onLoadStartListener = (f) =>
                this.triggerEvent(new vR(f))),
              (this.ngModule = s.get(Bn)),
              (this.console = s.get(hM));
            const d = s.get(_e);
            (this.isNgZoneEnabled = d instanceof _e && _e.isInAngularZone()),
              this.resetConfig(u),
              (this.currentUrlTree = (function HA() {
                return new Gn(new B([], {}), {}, null);
              })()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = Zv(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new Tt({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          get browserPageId() {
            return this.location.getState()?.ɵrouterPageId;
          }
          setupNavigations(n) {
            const r = this.events;
            return n.pipe(
              wn((o) => 0 !== o.id),
              G((o) => ({
                ...o,
                extractedUrl: this.urlHandlingStrategy.extract(o.rawUrl),
              })),
              jt((o) => {
                let i = !1,
                  s = !1;
                return S(o).pipe(
                  Le((a) => {
                    this.currentNavigation = {
                      id: a.id,
                      initialUrl: a.rawUrl,
                      extractedUrl: a.extractedUrl,
                      trigger: a.source,
                      extras: a.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? {
                            ...this.lastSuccessfulNavigation,
                            previousNavigation: null,
                          }
                        : null,
                    };
                  }),
                  jt((a) => {
                    const u = this.browserUrlTree.toString(),
                      l =
                        !this.navigated ||
                        a.extractedUrl.toString() !== u ||
                        u !== this.currentUrlTree.toString();
                    if (
                      ("reload" === this.onSameUrlNavigation || l) &&
                      this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl)
                    )
                      return (
                        bD(a.source) && (this.browserUrlTree = a.extractedUrl),
                        S(a).pipe(
                          jt((d) => {
                            const f = this.transitions.getValue();
                            return (
                              r.next(
                                new jc(
                                  d.id,
                                  this.serializeUrl(d.extractedUrl),
                                  d.source,
                                  d.restoredState
                                )
                              ),
                              f !== this.transitions.getValue()
                                ? Bt
                                : Promise.resolve(d)
                            );
                          }),
                          (function hx(e, t, n, r) {
                            return jt((o) =>
                              (function dx(e, t, n, r, o) {
                                return new fx(e, t, n, r, o).apply();
                              })(e, t, n, o.extractedUrl, r).pipe(
                                G((i) => ({ ...o, urlAfterRedirects: i }))
                              )
                            );
                          })(
                            this.ngModule.injector,
                            this.configLoader,
                            this.urlSerializer,
                            this.config
                          ),
                          Le((d) => {
                            (this.currentNavigation = {
                              ...this.currentNavigation,
                              finalUrl: d.urlAfterRedirects,
                            }),
                              (o.urlAfterRedirects = d.urlAfterRedirects);
                          }),
                          (function _x(e, t, n, r, o, i) {
                            return Me((s) =>
                              (function mx(
                                e,
                                t,
                                n,
                                r,
                                o,
                                i,
                                s = "emptyOnly",
                                a = "legacy"
                              ) {
                                return new yx(e, t, n, r, o, s, a, i)
                                  .recognize()
                                  .pipe(
                                    jt((u) =>
                                      null === u
                                        ? (function gx(e) {
                                            return new ye((t) => t.error(e));
                                          })(new px())
                                        : S(u)
                                    )
                                  );
                              })(
                                e,
                                t,
                                n,
                                s.urlAfterRedirects,
                                r.serialize(s.urlAfterRedirects),
                                r,
                                o,
                                i
                              ).pipe(G((a) => ({ ...s, targetSnapshot: a })))
                            );
                          })(
                            this.ngModule.injector,
                            this.rootComponentType,
                            this.config,
                            this.urlSerializer,
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          Le((d) => {
                            if (
                              ((o.targetSnapshot = d.targetSnapshot),
                              "eager" === this.urlUpdateStrategy)
                            ) {
                              if (!d.extras.skipLocationChange) {
                                const h = this.urlHandlingStrategy.merge(
                                  d.urlAfterRedirects,
                                  d.rawUrl
                                );
                                this.setBrowserUrl(h, d);
                              }
                              this.browserUrlTree = d.urlAfterRedirects;
                            }
                            const f = new hR(
                              d.id,
                              this.serializeUrl(d.extractedUrl),
                              this.serializeUrl(d.urlAfterRedirects),
                              d.targetSnapshot
                            );
                            r.next(f);
                          })
                        )
                      );
                    if (
                      l &&
                      this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                    ) {
                      const {
                          id: f,
                          extractedUrl: h,
                          source: p,
                          restoredState: g,
                          extras: y,
                        } = a,
                        D = new jc(f, this.serializeUrl(h), p, g);
                      r.next(D);
                      const w = Zv(h, this.rootComponentType).snapshot;
                      return S(
                        (o = {
                          ...a,
                          targetSnapshot: w,
                          urlAfterRedirects: h,
                          extras: {
                            ...y,
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          },
                        })
                      );
                    }
                    return (this.rawUrlTree = a.rawUrl), a.resolve(null), Bt;
                  }),
                  Le((a) => {
                    const u = new pR(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    );
                    this.triggerEvent(u);
                  }),
                  G(
                    (a) =>
                      (o = {
                        ...a,
                        guards: jR(
                          a.targetSnapshot,
                          a.currentSnapshot,
                          this.rootContexts
                        ),
                      })
                  ),
                  (function ZR(e, t) {
                    return Me((n) => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: o,
                        guards: {
                          canActivateChecks: i,
                          canDeactivateChecks: s,
                        },
                      } = n;
                      return 0 === s.length && 0 === i.length
                        ? S({ ...n, guardsResult: !0 })
                        : (function QR(e, t, n, r) {
                            return ve(e).pipe(
                              Me((o) =>
                                (function nx(e, t, n, r, o) {
                                  const i =
                                    t && t.routeConfig
                                      ? t.routeConfig.canDeactivate
                                      : null;
                                  return i && 0 !== i.length
                                    ? S(
                                        i.map((a) => {
                                          const u = ni(t) ?? o,
                                            l = zr(a, u);
                                          return bn(
                                            (function WR(e) {
                                              return e && ii(e.canDeactivate);
                                            })(l)
                                              ? l.canDeactivate(e, t, n, r)
                                              : u.runInContext(() =>
                                                  l(e, t, n, r)
                                                )
                                          ).pipe(Cn());
                                        })
                                      ).pipe(Gr())
                                    : S(!0);
                                })(o.component, o.route, n, t, r)
                              ),
                              Cn((o) => !0 !== o, !0)
                            );
                          })(s, r, o, e).pipe(
                            Me((a) =>
                              a &&
                              (function HR(e) {
                                return "boolean" == typeof e;
                              })(a)
                                ? (function YR(e, t, n, r) {
                                    return ve(t).pipe(
                                      zn((o) =>
                                        Mc(
                                          (function XR(e, t) {
                                            return (
                                              null !== e && t && t(new wR(e)),
                                              S(!0)
                                            );
                                          })(o.route.parent, r),
                                          (function JR(e, t) {
                                            return (
                                              null !== e && t && t(new _R(e)),
                                              S(!0)
                                            );
                                          })(o.route, r),
                                          (function tx(e, t, n) {
                                            const r = t[t.length - 1],
                                              i = t
                                                .slice(0, t.length - 1)
                                                .reverse()
                                                .map((s) =>
                                                  (function VR(e) {
                                                    const t = e.routeConfig
                                                      ? e.routeConfig
                                                          .canActivateChild
                                                      : null;
                                                    return t && 0 !== t.length
                                                      ? { node: e, guards: t }
                                                      : null;
                                                  })(s)
                                                )
                                                .filter((s) => null !== s)
                                                .map((s) =>
                                                  _v(() =>
                                                    S(
                                                      s.guards.map((u) => {
                                                        const l =
                                                            ni(s.node) ?? n,
                                                          c = zr(u, l);
                                                        return bn(
                                                          (function GR(e) {
                                                            return (
                                                              e &&
                                                              ii(
                                                                e.canActivateChild
                                                              )
                                                            );
                                                          })(c)
                                                            ? c.canActivateChild(
                                                                r,
                                                                e
                                                              )
                                                            : l.runInContext(
                                                                () => c(r, e)
                                                              )
                                                        ).pipe(Cn());
                                                      })
                                                    ).pipe(Gr())
                                                  )
                                                );
                                            return S(i).pipe(Gr());
                                          })(e, o.path, n),
                                          (function ex(e, t, n) {
                                            const r = t.routeConfig
                                              ? t.routeConfig.canActivate
                                              : null;
                                            if (!r || 0 === r.length)
                                              return S(!0);
                                            const o = r.map((i) =>
                                              _v(() => {
                                                const s = ni(t) ?? n,
                                                  a = zr(i, s);
                                                return bn(
                                                  (function zR(e) {
                                                    return (
                                                      e && ii(e.canActivate)
                                                    );
                                                  })(a)
                                                    ? a.canActivate(t, e)
                                                    : s.runInContext(() =>
                                                        a(t, e)
                                                      )
                                                ).pipe(Cn());
                                              })
                                            );
                                            return S(o).pipe(Gr());
                                          })(e, o.route, n)
                                        )
                                      ),
                                      Cn((o) => !0 !== o, !0)
                                    );
                                  })(r, i, e, t)
                                : S(a)
                            ),
                            G((a) => ({ ...n, guardsResult: a }))
                          );
                    });
                  })(this.ngModule.injector, (a) => this.triggerEvent(a)),
                  Le((a) => {
                    if (((o.guardsResult = a.guardsResult), qn(a.guardsResult)))
                      throw Xv(0, a.guardsResult);
                    const u = new gR(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    );
                    this.triggerEvent(u);
                  }),
                  wn(
                    (a) =>
                      !!a.guardsResult ||
                      (this.restoreHistory(a),
                      this.cancelNavigationTransition(a, "", 3),
                      !1)
                  ),
                  Jc((a) => {
                    if (a.guards.canActivateChecks.length)
                      return S(a).pipe(
                        Le((u) => {
                          const l = new mR(
                            u.id,
                            this.serializeUrl(u.extractedUrl),
                            this.serializeUrl(u.urlAfterRedirects),
                            u.targetSnapshot
                          );
                          this.triggerEvent(l);
                        }),
                        jt((u) => {
                          let l = !1;
                          return S(u).pipe(
                            (function bx(e, t) {
                              return Me((n) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: o },
                                } = n;
                                if (!o.length) return S(n);
                                let i = 0;
                                return ve(o).pipe(
                                  zn((s) =>
                                    (function Ex(e, t, n, r) {
                                      const o = e.routeConfig,
                                        i = e._resolve;
                                      return (
                                        void 0 !== o?.title &&
                                          !vD(o) &&
                                          (i[Ko] = o.title),
                                        (function Ix(e, t, n, r) {
                                          const o = (function Sx(e) {
                                            return [
                                              ...Object.keys(e),
                                              ...Object.getOwnPropertySymbols(
                                                e
                                              ),
                                            ];
                                          })(e);
                                          if (0 === o.length) return S({});
                                          const i = {};
                                          return ve(o).pipe(
                                            Me((s) =>
                                              (function Mx(e, t, n, r) {
                                                const o = ni(t) ?? r,
                                                  i = zr(e, o);
                                                return bn(
                                                  i.resolve
                                                    ? i.resolve(t, n)
                                                    : o.runInContext(() =>
                                                        i(t, n)
                                                      )
                                                );
                                              })(e[s], t, n, r).pipe(
                                                Cn(),
                                                Le((a) => {
                                                  i[s] = a;
                                                })
                                              )
                                            ),
                                            Ac(1),
                                            (function jA(e) {
                                              return G(() => e);
                                            })(i),
                                            _n((s) => (Zc(s) ? Bt : Wo(s)))
                                          );
                                        })(i, e, t, r).pipe(
                                          G(
                                            (s) => (
                                              (e._resolvedData = s),
                                              (e.data = Qv(e, n).resolve),
                                              o &&
                                                vD(o) &&
                                                (e.data[Ko] = o.title),
                                              null
                                            )
                                          )
                                        )
                                      );
                                    })(s.route, r, e, t)
                                  ),
                                  Le(() => i++),
                                  Ac(1),
                                  Me((s) => (i === o.length ? S(n) : Bt))
                                );
                              });
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            Le({
                              next: () => (l = !0),
                              complete: () => {
                                l ||
                                  (this.restoreHistory(u),
                                  this.cancelNavigationTransition(u, "", 2));
                              },
                            })
                          );
                        }),
                        Le((u) => {
                          const l = new yR(
                            u.id,
                            this.serializeUrl(u.extractedUrl),
                            this.serializeUrl(u.urlAfterRedirects),
                            u.targetSnapshot
                          );
                          this.triggerEvent(l);
                        })
                      );
                  }),
                  Jc((a) => {
                    const u = (l) => {
                      const c = [];
                      l.routeConfig?.loadComponent &&
                        !l.routeConfig._loadedComponent &&
                        c.push(
                          this.configLoader.loadComponent(l.routeConfig).pipe(
                            Le((d) => {
                              l.component = d;
                            }),
                            G(() => {})
                          )
                        );
                      for (const d of l.children) c.push(...u(d));
                      return c;
                    };
                    return wv(u(a.targetSnapshot.root)).pipe(Gs(), qo(1));
                  }),
                  Jc(() => this.afterPreactivation()),
                  G((a) => {
                    const u = (function MR(e, t, n) {
                      const r = ei(e, t._root, n ? n._root : void 0);
                      return new Kv(r, t);
                    })(
                      this.routeReuseStrategy,
                      a.targetSnapshot,
                      a.currentRouterState
                    );
                    return (o = { ...a, targetRouterState: u });
                  }),
                  Le((a) => {
                    (this.currentUrlTree = a.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        a.urlAfterRedirects,
                        a.rawUrl
                      )),
                      (this.routerState = a.targetRouterState),
                      "deferred" === this.urlUpdateStrategy &&
                        (a.extras.skipLocationChange ||
                          this.setBrowserUrl(this.rawUrlTree, a),
                        (this.browserUrlTree = a.urlAfterRedirects));
                  }),
                  ((e, t, n) =>
                    G(
                      (r) => (
                        new LR(
                          t,
                          r.targetRouterState,
                          r.currentRouterState,
                          n
                        ).activate(e),
                        r
                      )
                    ))(this.rootContexts, this.routeReuseStrategy, (a) =>
                    this.triggerEvent(a)
                  ),
                  Le({
                    next() {
                      i = !0;
                    },
                    complete() {
                      i = !0;
                    },
                  }),
                  Rc(() => {
                    i || s || this.cancelNavigationTransition(o, "", 1),
                      this.currentNavigation?.id === o.id &&
                        (this.currentNavigation = null);
                  }),
                  _n((a) => {
                    if (((s = !0), nD(a))) {
                      tD(a) ||
                        ((this.navigated = !0), this.restoreHistory(o, !0));
                      const u = new Js(
                        o.id,
                        this.serializeUrl(o.extractedUrl),
                        a.message,
                        a.cancellationCode
                      );
                      if ((r.next(u), tD(a))) {
                        const l = this.urlHandlingStrategy.merge(
                            a.url,
                            this.rawUrlTree
                          ),
                          c = {
                            skipLocationChange: o.extras.skipLocationChange,
                            replaceUrl:
                              "eager" === this.urlUpdateStrategy ||
                              bD(o.source),
                          };
                        this.scheduleNavigation(l, "imperative", null, c, {
                          resolve: o.resolve,
                          reject: o.reject,
                          promise: o.promise,
                        });
                      } else o.resolve(!1);
                    } else {
                      this.restoreHistory(o, !0);
                      const u = new Gv(
                        o.id,
                        this.serializeUrl(o.extractedUrl),
                        a,
                        o.targetSnapshot ?? void 0
                      );
                      r.next(u);
                      try {
                        o.resolve(this.errorHandler(a));
                      } catch (l) {
                        o.reject(l);
                      }
                    }
                    return Bt;
                  })
                );
              })
            );
          }
          resetRootComponentType(n) {
            (this.rootComponentType = n),
              (this.routerState.root.component = this.rootComponentType);
          }
          setTransition(n) {
            this.transitions.next({ ...this.transitions.value, ...n });
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    const o = { replaceUrl: !0 },
                      i = n.state?.navigationId ? n.state : null;
                    if (i) {
                      const a = { ...i };
                      delete a.navigationId,
                        delete a.ɵrouterPageId,
                        0 !== Object.keys(a).length && (o.state = a);
                    }
                    const s = this.parseUrl(n.url);
                    this.scheduleNavigation(s, r, i, o);
                  }, 0);
              }));
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.currentNavigation;
          }
          triggerEvent(n) {
            this.events.next(n);
          }
          resetConfig(n) {
            (this.config = n.map(Kc)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: o,
                queryParams: i,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: u,
              } = r,
              l = o || this.routerState.root,
              c = u ? this.currentUrlTree.fragment : s;
            let d = null;
            switch (a) {
              case "merge":
                d = { ...this.currentUrlTree.queryParams, ...i };
                break;
              case "preserve":
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = i || null;
            }
            return (
              null !== d && (d = this.removeEmptyProps(d)),
              aR(l, this.currentUrlTree, n, d, c ?? null)
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const o = qn(n) ? n : this.parseUrl(n),
              i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
            return this.scheduleNavigation(i, "imperative", null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function Vx(e) {
                for (let t = 0; t < e.length; t++) {
                  if (null == e[t]) throw new b(4008, false);
                }
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (o) {
              r = this.malformedUriErrorHandler(o, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let o;
            if (((o = !0 === r ? { ...kx } : !1 === r ? { ...Lx } : r), qn(n)))
              return xv(this.currentUrlTree, n, o);
            const i = this.parseUrl(n);
            return xv(this.currentUrlTree, i, o);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, o) => {
              const i = n[o];
              return null != i && (r[o] = i), r;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (n) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = n.id),
                  (this.currentPageId = n.targetPageId),
                  this.events.next(
                    new Kn(
                      n.id,
                      this.serializeUrl(n.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  this.titleStrategy?.updateTitle(this.routerState.snapshot),
                  n.resolve(!0);
              },
              (n) => {
                this.console.warn(`Unhandled Navigation Error: ${n}`);
              }
            );
          }
          scheduleNavigation(n, r, o, i, s) {
            if (this.disposed) return Promise.resolve(!1);
            let a, u, l;
            s
              ? ((a = s.resolve), (u = s.reject), (l = s.promise))
              : (l = new Promise((f, h) => {
                  (a = f), (u = h);
                }));
            const c = ++this.navigationId;
            let d;
            return (
              "computed" === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (o = this.location.getState()),
                  (d =
                    o && o.ɵrouterPageId
                      ? o.ɵrouterPageId
                      : i.replaceUrl || i.skipLocationChange
                      ? this.browserPageId ?? 0
                      : (this.browserPageId ?? 0) + 1))
                : (d = 0),
              this.setTransition({
                id: c,
                targetPageId: d,
                source: r,
                restoredState: o,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: n,
                extras: i,
                resolve: a,
                reject: u,
                promise: l,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              l.catch((f) => Promise.reject(f))
            );
          }
          setBrowserUrl(n, r) {
            const o = this.urlSerializer.serialize(n),
              i = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, r.targetPageId),
              };
            this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl
              ? this.location.replaceState(o, "", i)
              : this.location.go(o, "", i);
          }
          restoreHistory(n, r = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const o = this.currentPageId - n.targetPageId;
              ("popstate" !== n.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !== this.currentNavigation?.finalUrl) ||
              0 === o
                ? this.currentUrlTree === this.currentNavigation?.finalUrl &&
                  0 === o &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(o);
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          cancelNavigationTransition(n, r, o) {
            const i = new Js(n.id, this.serializeUrl(n.extractedUrl), r, o);
            this.triggerEvent(i), n.resolve(!1);
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
        }
        return (
          (e.ɵfac = function (n) {
            Uu();
          }),
          (e.ɵprov = L({
            token: e,
            factory: function () {
              return _D();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      function bD(e) {
        return "imperative" !== e;
      }
      let ai = (() => {
        class e {
          constructor(n, r, o) {
            (this.router = n),
              (this.route = r),
              (this.locationStrategy = o),
              (this._preserveFragment = !1),
              (this._skipLocationChange = !1),
              (this._replaceUrl = !1),
              (this.commands = null),
              (this.href = null),
              (this.onChanges = new At()),
              (this.subscription = n.events.subscribe((i) => {
                i instanceof Kn && this.updateTargetUrlAndHref();
              }));
          }
          set preserveFragment(n) {
            this._preserveFragment = Vr(n);
          }
          get preserveFragment() {
            return this._preserveFragment;
          }
          set skipLocationChange(n) {
            this._skipLocationChange = Vr(n);
          }
          get skipLocationChange() {
            return this._skipLocationChange;
          }
          set replaceUrl(n) {
            this._replaceUrl = Vr(n);
          }
          get replaceUrl() {
            return this._replaceUrl;
          }
          set routerLink(n) {
            this.commands = null != n ? (Array.isArray(n) ? n : [n]) : null;
          }
          ngOnChanges(n) {
            this.updateTargetUrlAndHref(), this.onChanges.next(this);
          }
          ngOnDestroy() {
            this.subscription.unsubscribe();
          }
          onClick(n, r, o, i, s) {
            return (
              !!(
                0 !== n ||
                r ||
                o ||
                i ||
                s ||
                ("string" == typeof this.target && "_self" != this.target) ||
                null === this.urlTree
              ) ||
              (this.router.navigateByUrl(this.urlTree, {
                skipLocationChange: this.skipLocationChange,
                replaceUrl: this.replaceUrl,
                state: this.state,
              }),
              !1)
            );
          }
          updateTargetUrlAndHref() {
            this.href =
              null !== this.urlTree
                ? this.locationStrategy.prepareExternalUrl(
                    this.router.serializeUrl(this.urlTree)
                  )
                : null;
          }
          get urlTree() {
            return null === this.commands
              ? null
              : this.router.createUrlTree(this.commands, {
                  relativeTo:
                    void 0 !== this.relativeTo ? this.relativeTo : this.route,
                  queryParams: this.queryParams,
                  fragment: this.fragment,
                  queryParamsHandling: this.queryParamsHandling,
                  preserveFragment: this.preserveFragment,
                });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(E(Re), E(En), E(Un));
          }),
          (e.ɵdir = xe({
            type: e,
            selectors: [
              ["a", "routerLink", ""],
              ["area", "routerLink", ""],
            ],
            hostVars: 2,
            hostBindings: function (n, r) {
              1 & n &&
                cs("click", function (i) {
                  return r.onClick(
                    i.button,
                    i.ctrlKey,
                    i.shiftKey,
                    i.altKey,
                    i.metaKey
                  );
                }),
                2 & n && pl("target", r.target)("href", r.href, cu);
            },
            inputs: {
              target: "target",
              queryParams: "queryParams",
              fragment: "fragment",
              queryParamsHandling: "queryParamsHandling",
              state: "state",
              relativeTo: "relativeTo",
              preserveFragment: "preserveFragment",
              skipLocationChange: "skipLocationChange",
              replaceUrl: "replaceUrl",
              routerLink: "routerLink",
            },
            standalone: !0,
            features: [Fn],
          })),
          e
        );
      })();
      class ED {}
      let Hx = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.router = n),
              (this.injector = o),
              (this.preloadingStrategy = i),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                wn((n) => n instanceof Kn),
                zn(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const o = [];
            for (const i of r) {
              i.providers &&
                !i._injector &&
                (i._injector = ys(i.providers, n, `Route: ${i.path}`));
              const s = i._injector ?? n,
                a = i._loadedInjector ?? s;
              (i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
              (i.loadComponent && !i._loadedComponent)
                ? o.push(this.preloadConfig(s, i))
                : (i.children || i._loadedRoutes) &&
                  o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
            }
            return ve(o).pipe(Qn());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : S(null);
              const i = o.pipe(
                Me((s) =>
                  null === s
                    ? S(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? n, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? ve([i, this.loader.loadComponent(r)]).pipe(Qn())
                : i;
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Re), M(Hl), M(fn), M(ED), M(ed));
          }),
          (e.ɵprov = L({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const nd = new P("");
      let ID = (() => {
        class e {
          constructor(n, r, o = {}) {
            (this.router = n),
              (this.viewportScroller = r),
              (this.options = o),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (o.scrollPositionRestoration =
                o.scrollPositionRestoration || "disabled"),
              (o.anchorScrolling = o.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.router.events.subscribe((n) => {
              n instanceof jc
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof Kn &&
                  ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.router.parseUrl(n.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.router.events.subscribe((n) => {
              n instanceof Wv &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.router.triggerEvent(
              new Wv(
                n,
                "popstate" === this.lastSource
                  ? this.store[this.restoredId]
                  : null,
                r
              )
            );
          }
          ngOnDestroy() {
            this.routerEventsSubscription &&
              this.routerEventsSubscription.unsubscribe(),
              this.scrollEventsSubscription &&
                this.scrollEventsSubscription.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            Uu();
          }),
          (e.ɵprov = L({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function Wr(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function rd(e) {
        return [{ provide: Xc, multi: !0, useValue: e }];
      }
      function MD() {
        const e = de(Dt);
        return (t) => {
          const n = e.get(Es);
          if (t !== n.components[0]) return;
          const r = e.get(Re),
            o = e.get(TD);
          1 === e.get(od) && r.initialNavigation(),
            e.get(AD, null, A.Optional)?.setUpPreloading(),
            e.get(nd, null, A.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            o.next(),
            o.complete();
        };
      }
      const TD = new P("", { factory: () => new At() }),
        od = new P("", { providedIn: "root", factory: () => 1 });
      const AD = new P("");
      function Wx(e) {
        return Wr(0, [
          { provide: AD, useExisting: Hx },
          { provide: ED, useExisting: e },
        ]);
      }
      const RD = new P("ROUTER_FORROOT_GUARD"),
        qx = [
          oc,
          { provide: Fv, useClass: Nc },
          { provide: Re, useFactory: _D },
          ti,
          {
            provide: En,
            useFactory: function SD(e) {
              return e.routerState.root;
            },
            deps: [Re],
          },
          ed,
        ];
      function Kx() {
        return new ly("Router", Re);
      }
      let xD = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                qx,
                [],
                rd(n),
                {
                  provide: RD,
                  useFactory: Jx,
                  deps: [[Re, new go(), new mo()]],
                },
                { provide: ua, useValue: r || {} },
                r?.useHash
                  ? { provide: Un, useClass: t1 }
                  : { provide: Un, useClass: Oy },
                {
                  provide: nd,
                  useFactory: () => {
                    const e = de(Re),
                      t = de(bT),
                      n = de(ua);
                    return (
                      n.scrollOffset && t.setOffset(n.scrollOffset),
                      new ID(e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? Wx(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: ly, multi: !0, useFactory: Kx },
                r?.initialNavigation ? Xx(r) : [],
                [
                  { provide: ND, useFactory: MD },
                  { provide: ny, multi: !0, useExisting: ND },
                ],
              ],
            };
          }
          static forChild(n) {
            return { ngModule: e, providers: [rd(n)] };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(RD, 8));
          }),
          (e.ɵmod = An({ type: e })),
          (e.ɵinj = sn({ imports: [Wc] })),
          e
        );
      })();
      function Jx(e) {
        return "guarded";
      }
      function Xx(e) {
        return [
          "disabled" === e.initialNavigation
            ? Wr(3, [
                {
                  provide: Cs,
                  multi: !0,
                  useFactory: () => {
                    const t = de(Re);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: od, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? Wr(2, [
                { provide: od, useValue: 0 },
                {
                  provide: Cs,
                  multi: !0,
                  deps: [Dt],
                  useFactory: (t) => {
                    const n = t.get(XM, Promise.resolve());
                    let r = !1;
                    return () =>
                      n.then(
                        () =>
                          new Promise((i) => {
                            const s = t.get(Re),
                              a = t.get(TD);
                            (function o(i) {
                              t.get(Re)
                                .events.pipe(
                                  wn(
                                    (a) =>
                                      a instanceof Kn ||
                                      a instanceof Js ||
                                      a instanceof Gv
                                  ),
                                  G(
                                    (a) =>
                                      a instanceof Kn ||
                                      (a instanceof Js &&
                                        (0 === a.code || 1 === a.code) &&
                                        null)
                                  ),
                                  wn((a) => null !== a),
                                  qo(1)
                                )
                                .subscribe(() => {
                                  i();
                                });
                            })(() => {
                              i(!0), (r = !0);
                            }),
                              (s.afterPreactivation = () => (
                                i(!0), r || a.closed ? S(void 0) : a
                              )),
                              s.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const ND = new P("");
      let tN = (() => {
        class e {
          constructor() {
            this.title = "test-task";
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Jn({
            type: e,
            selectors: [["app-root"]],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && ss(0, "router-outlet");
            },
            dependencies: [Gc],
          })),
          e
        );
      })();
      const nN = {
        total: 100,
        data: [
          {
            _id: "5d99beb677015a5c2c14542e",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Jordan", last: "Bauer" },
            company: "SNORUS",
            email: "jordan.bauer@snorus.net",
            phone: "+1 (901) 404-2928",
            address: "712 Bills Place, Cochranville, Florida, 6951",
          },
          {
            _id: "5d99beb69a6aac64be820dbe",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Francis", last: "Owens" },
            company: "EXOPLODE",
            email: "francis.owens@exoplode.us",
            phone: "+1 (954) 566-2476",
            address: "457 Stockholm Street, Montura, Pennsylvania, 7855",
          },
          {
            _id: "5d99beb635dd82195040195b",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Bass", last: "Church" },
            company: "ACCRUEX",
            email: "bass.church@accruex.com",
            phone: "+1 (881) 403-2661",
            address: "786 Ira Court, Abiquiu, Kentucky, 1055",
          },
          {
            _id: "5d99beb6283bac04b3763000",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Mabel", last: "Holt" },
            company: "MALATHION",
            email: "mabel.holt@malathion.io",
            phone: "+1 (951) 520-3392",
            address: "890 Alice Court, Bath, New Hampshire, 6400",
          },
          {
            _id: "5d99beb6207f35413c9b629b",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Lambert", last: "Higgins" },
            company: "GEEKOLOGY",
            email: "lambert.higgins@geekology.name",
            phone: "+1 (957) 573-3207",
            address: "513 Schroeders Avenue, Moquino, Connecticut, 6353",
          },
          {
            _id: "5d99beb6f6db754cee0835a0",
            amount: "floating(1, 4000, 2)",
            type: "income",
            name: { first: "Jeanie", last: "Wiley" },
            company: "CORECOM",
            email: "jeanie.wiley@corecom.tv",
            phone: "+1 (931) 432-2272",
            address: "196 Highland Boulevard, Wildwood, Georgia, 8732",
          },
          {
            _id: "5d99beb6c0c5d1e73c8bb5a2",
            amount: "floating(1, 4000, 2)",
            type: "income",
            name: { first: "Lynn", last: "Summers" },
            company: "BLUEGRAIN",
            email: "lynn.summers@bluegrain.biz",
            phone: "+1 (877) 578-3987",
            address: "999 Ellery Street, Hartsville/Hartley, Tennessee, 8475",
          },
          {
            _id: "5d99beb69aec11b778e276c9",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Roseann", last: "Lowe" },
            company: "NORALI",
            email: "roseann.lowe@norali.org",
            phone: "+1 (969) 433-3912",
            address:
              "209 Saratoga Avenue, Riegelwood, Northern Mariana Islands, 3804",
          },
          {
            _id: "5d99beb61851f0fadfe6bca0",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Dianna", last: "Underwood" },
            company: "GEOLOGIX",
            email: "dianna.underwood@geologix.me",
            phone: "+1 (831) 506-2281",
            address: "379 Polar Street, Derwood, Michigan, 8219",
          },
          {
            _id: "5d99beb61894e3a0d8a8aaeb",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Misty", last: "Wells" },
            company: "ZILCH",
            email: "misty.wells@zilch.info",
            phone: "+1 (803) 453-3224",
            address: "473 Rochester Avenue, Kraemer, Illinois, 140",
          },
          {
            _id: "5d99beb6b15536f75b46a608",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Tammie", last: "Cotton" },
            company: "GENMOM",
            email: "tammie.cotton@genmom.co.uk",
            phone: "+1 (891) 471-2924",
            address: "599 Juliana Place, Alafaya, Maryland, 917",
          },
          {
            _id: "5d99beb62fc237aa62133abc",
            amount: "floating(1, 4000, 2)",
            type: "income",
            name: { first: "Rasmussen", last: "Paul" },
            company: "SUPPORTAL",
            email: "rasmussen.paul@supportal.biz",
            phone: "+1 (829) 473-3553",
            address: "164 Cedar Street, Basye, District Of Columbia, 5164",
          },
          {
            _id: "5d99beb6e0f76b46c0f5ce21",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Allie", last: "Solomon" },
            company: "TOYLETRY",
            email: "allie.solomon@toyletry.net",
            phone: "+1 (835) 596-3561",
            address: "335 Noll Street, Ernstville, New York, 5938",
          },
          {
            _id: "5d99beb67ba49c6e156b8999",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Hammond", last: "Stanton" },
            company: "XTH",
            email: "hammond.stanton@xth.us",
            phone: "+1 (967) 413-2650",
            address: "468 Clifton Place, Harold, Puerto Rico, 2501",
          },
          {
            _id: "5d99beb6b13450897a61c8b0",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Scott", last: "Petty" },
            company: "ZOINAGE",
            email: "scott.petty@zoinage.com",
            phone: "+1 (913) 425-3420",
            address: "475 Herkimer Street, Barstow, Utah, 9466",
          },
          {
            _id: "5d99beb6f9f4e1748d85a971",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Alexander", last: "Harrell" },
            company: "RONELON",
            email: "alexander.harrell@ronelon.io",
            phone: "+1 (940) 577-2114",
            address: "962 Falmouth Street, Loma, Iowa, 2743",
          },
          {
            _id: "5d99beb600162e31cce6d255",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Letitia", last: "Combs" },
            company: "PHOLIO",
            email: "letitia.combs@pholio.name",
            phone: "+1 (962) 515-2518",
            address: "480 Tapscott Avenue, Remington, Arkansas, 4987",
          },
          {
            _id: "5d99beb6f46990cdedd7a054",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Myers", last: "Russell" },
            company: "IDEGO",
            email: "myers.russell@idego.tv",
            phone: "+1 (923) 524-3492",
            address: "912 Veronica Place, Sugartown, Alabama, 1510",
          },
          {
            _id: "5d99beb68066435dd603b971",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Daphne", last: "Pearson" },
            company: "ZYTREK",
            email: "daphne.pearson@zytrek.biz",
            phone: "+1 (887) 565-2927",
            address: "786 Elliott Walk, Collins, California, 7185",
          },
          {
            _id: "5d99beb6481acdc4f1f2dbcd",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Dillon", last: "Hull" },
            company: "CENTURIA",
            email: "dillon.hull@centuria.org",
            phone: "+1 (882) 473-3051",
            address: "915 Dekoven Court, Tyhee, Indiana, 7029",
          },
          {
            _id: "5d99beb66abe615580c7868c",
            amount: "floating(1, 4000, 2)",
            type: "income",
            name: { first: "Reese", last: "Hunt" },
            company: "KEENGEN",
            email: "reese.hunt@keengen.me",
            phone: "+1 (983) 503-2309",
            address: "280 Delevan Street, Tyro, Nebraska, 3995",
          },
          {
            _id: "5d99beb6cf9df8720ce4e771",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Howard", last: "Hodge" },
            company: "KIOSK",
            email: "howard.hodge@kiosk.info",
            phone: "+1 (937) 538-3339",
            address: "350 Schenectady Avenue, Osmond, North Carolina, 6893",
          },
          {
            _id: "5d99beb6022f6189a1f23970",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Kathleen", last: "Patel" },
            company: "ACCUFARM",
            email: "kathleen.patel@accufarm.co.uk",
            phone: "+1 (988) 567-3882",
            address: "801 Albany Avenue, Greenbackville, Delaware, 8396",
          },
          {
            _id: "5d99beb6230c62aa8243ff80",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Amparo", last: "Horne" },
            company: "MARQET",
            email: "amparo.horne@marqet.biz",
            phone: "+1 (958) 519-3437",
            address: "584 Colonial Court, Waterview, Oregon, 8213",
          },
          {
            _id: "5d99beb6f7f32d24da875f1b",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Acevedo", last: "Finley" },
            company: "DANCITY",
            email: "acevedo.finley@dancity.net",
            phone: "+1 (955) 598-3527",
            address: "185 Amboy Street, Elliston, Virgin Islands, 374",
          },
          {
            _id: "5d99beb68b54b0c3a0ef3470",
            amount: "floating(1, 4000, 2)",
            type: "income",
            name: { first: "Moore", last: "Strong" },
            company: "TELEQUIET",
            email: "moore.strong@telequiet.us",
            phone: "+1 (809) 406-3732",
            address: "542 Will Place, Hampstead, Montana, 6733",
          },
          {
            _id: "5d99beb6b7490a9aacc00b1a",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Ina", last: "Becker" },
            company: "QUOTEZART",
            email: "ina.becker@quotezart.com",
            phone: "+1 (955) 491-3087",
            address: "699 Miller Place, Glidden, Idaho, 6159",
          },
          {
            _id: "5d99beb64e9dfcb53acd8626",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Dorsey", last: "Juarez" },
            company: "ENERSAVE",
            email: "dorsey.juarez@enersave.io",
            phone: "+1 (937) 403-2109",
            address: "427 Rock Street, Joppa, New Jersey, 9046",
          },
          {
            _id: "5d99beb6f53bb9cc0b870839",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Wolfe", last: "Michael" },
            company: "ISOLOGIA",
            email: "wolfe.michael@isologia.name",
            phone: "+1 (928) 559-2490",
            address: "612 Varick Street, Charco, West Virginia, 8585",
          },
          {
            _id: "5d99beb626d3124fa91e7429",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Manning", last: "Preston" },
            company: "GENMY",
            email: "manning.preston@genmy.tv",
            phone: "+1 (897) 497-3105",
            address: "161 Hubbard Street, Coaldale, Wyoming, 617",
          },
          {
            _id: "5d99beb664a4e4c72591f9a3",
            amount: "floating(1, 4000, 2)",
            type: "income",
            name: { first: "Tucker", last: "Bender" },
            company: "SUPREMIA",
            email: "tucker.bender@supremia.biz",
            phone: "+1 (934) 461-2588",
            address: "844 Metropolitan Avenue, Brule, Colorado, 3619",
          },
          {
            _id: "5d99beb66b24688a0de700a0",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Skinner", last: "Mcfarland" },
            company: "ZBOO",
            email: "skinner.mcfarland@zboo.org",
            phone: "+1 (965) 468-3953",
            address: "513 Clarkson Avenue, Crawfordsville, Palau, 2489",
          },
          {
            _id: "5d99beb6c0dba22f51f3adc2",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Farrell", last: "Campbell" },
            company: "HALAP",
            email: "farrell.campbell@halap.me",
            phone: "+1 (803) 588-2940",
            address: "481 Suydam Place, Machias, South Dakota, 1384",
          },
          {
            _id: "5d99beb6d3647cf8b14c9409",
            amount: "floating(1, 4000, 2)",
            type: "income",
            name: { first: "Cathy", last: "Oneil" },
            company: "ACUSAGE",
            email: "cathy.oneil@acusage.info",
            phone: "+1 (924) 587-3879",
            address: "663 Dahill Road, Crucible, Oklahoma, 4041",
          },
          {
            _id: "5d99beb698d1fbade2a863a3",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Lindsey", last: "Gates" },
            company: "HOTCAKES",
            email: "lindsey.gates@hotcakes.co.uk",
            phone: "+1 (912) 502-2920",
            address: "958 Crescent Street, Coyote, Vermont, 2958",
          },
          {
            _id: "5d99beb633f3e5c3e8378aa7",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Key", last: "Armstrong" },
            company: "VISUALIX",
            email: "key.armstrong@visualix.biz",
            phone: "+1 (845) 531-2978",
            address: "933 Woodpoint Road, Fontanelle, New Mexico, 7487",
          },
          {
            _id: "5d99beb6af9bf2e627e8f6ad",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Mueller", last: "Woods" },
            company: "SENSATE",
            email: "mueller.woods@sensate.net",
            phone: "+1 (853) 514-2094",
            address: "804 Kermit Place, Cetronia, Maine, 3848",
          },
          {
            _id: "5d99beb6967feb03ef03b2e9",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Stacey", last: "Aguilar" },
            company: "ENAUT",
            email: "stacey.aguilar@enaut.us",
            phone: "+1 (919) 573-2912",
            address: "237 Concord Street, Bannock, Mississippi, 2727",
          },
          {
            _id: "5d99beb6069071371bb4fe57",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Fitzpatrick", last: "Martinez" },
            company: "HINWAY",
            email: "fitzpatrick.martinez@hinway.com",
            phone: "+1 (868) 569-2829",
            address: "856 Willoughby Avenue, Draper, Washington, 4905",
          },
          {
            _id: "5d99beb645e90e295a14abaf",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Sanchez", last: "Hooper" },
            company: "REVERSUS",
            email: "sanchez.hooper@reversus.io",
            phone: "+1 (934) 445-2142",
            address: "489 Roebling Street, Gorst, Guam, 5212",
          },
          {
            _id: "5d99beb65b3f217fd4c9fe32",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Christian", last: "Henry" },
            company: "QUALITEX",
            email: "christian.henry@qualitex.name",
            phone: "+1 (871) 451-2636",
            address: "515 Baycliff Terrace, Englevale, Massachusetts, 2526",
          },
          {
            _id: "5d99beb690336c6b9a82eb4a",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Jodie", last: "Guerrero" },
            company: "ZENTIME",
            email: "jodie.guerrero@zentime.tv",
            phone: "+1 (849) 571-3318",
            address: "995 Tampa Court, Bloomington, Minnesota, 4717",
          },
          {
            _id: "5d99beb6c3b33f427845205d",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Conley", last: "Monroe" },
            company: "CANOPOLY",
            email: "conley.monroe@canopoly.biz",
            phone: "+1 (981) 584-2075",
            address: "439 Paerdegat Avenue, Gouglersville, Hawaii, 3452",
          },
          {
            _id: "5d99beb6121ba61ba9c779bc",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Janell", last: "Banks" },
            company: "ZORK",
            email: "janell.banks@zork.org",
            phone: "+1 (957) 525-3157",
            address: "706 Kimball Street, Brutus, Marshall Islands, 3668",
          },
          {
            _id: "5d99beb6e7771bb8cff666d6",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Ward", last: "Castro" },
            company: "SIGNIDYNE",
            email: "ward.castro@signidyne.me",
            phone: "+1 (881) 450-3092",
            address:
              "346 Atkins Avenue, Gloucester, Federated States Of Micronesia, 2540",
          },
          {
            _id: "5d99beb6086149feeefc2e66",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Hogan", last: "Walter" },
            company: "BARKARAMA",
            email: "hogan.walter@barkarama.info",
            phone: "+1 (815) 574-2671",
            address: "857 Indiana Place, Esmont, Texas, 8818",
          },
          {
            _id: "5d99beb6ff11eacb34de4f10",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Inez", last: "Zamora" },
            company: "ESSENSIA",
            email: "inez.zamora@essensia.co.uk",
            phone: "+1 (894) 557-2393",
            address: "465 Tompkins Place, Caron, Wisconsin, 5950",
          },
          {
            _id: "5d99beb60be55eb1da68c4ba",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Bridges", last: "Patton" },
            company: "SONGBIRD",
            email: "bridges.patton@songbird.biz",
            phone: "+1 (929) 410-2526",
            address: "137 Apollo Street, Balm, Arizona, 1965",
          },
          {
            _id: "5d99beb64337005cefde4626",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Grimes", last: "Jenkins" },
            company: "GINKLE",
            email: "grimes.jenkins@ginkle.net",
            phone: "+1 (916) 426-2443",
            address: "397 Ashland Place, Cedarville, Kansas, 8820",
          },
          {
            _id: "5d99beb6f7e4e652c75868a8",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Shepherd", last: "Durham" },
            company: "ZEAM",
            email: "shepherd.durham@zeam.us",
            phone: "+1 (970) 570-2377",
            address: "826 Union Avenue, Walker, Rhode Island, 9180",
          },
          {
            _id: "5d99beb63c892055952c1908",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Morris", last: "Stephens" },
            company: "AQUACINE",
            email: "morris.stephens@aquacine.com",
            phone: "+1 (854) 409-3865",
            address: "183 Tehama Street, Spokane, Nevada, 2375",
          },
          {
            _id: "5d99beb6c614fe4c8ca3c023",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Josie", last: "House" },
            company: "ISOSURE",
            email: "josie.house@isosure.io",
            phone: "+1 (901) 547-2615",
            address: "659 Hill Street, Rowe, Missouri, 8918",
          },
          {
            _id: "5d99beb6558891537809623e",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Hall", last: "Brewer" },
            company: "UBERLUX",
            email: "hall.brewer@uberlux.name",
            phone: "+1 (954) 436-3000",
            address: "335 Cumberland Walk, Loveland, North Dakota, 853",
          },
          {
            _id: "5d99beb6a5060fbac46cc79d",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Perkins", last: "Watkins" },
            company: "RUBADUB",
            email: "perkins.watkins@rubadub.tv",
            phone: "+1 (822) 587-3479",
            address: "240 Independence Avenue, Wanamie, Alaska, 3833",
          },
          {
            _id: "5d99beb68533edf2fdc241bb",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Bender", last: "Rivas" },
            company: "UNIA",
            email: "bender.rivas@unia.biz",
            phone: "+1 (826) 448-3886",
            address: "255 McDonald Avenue, Soudan, Louisiana, 6344",
          },
          {
            _id: "5d99beb6ba779217e965a21c",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Boone", last: "Butler" },
            company: "OPTICOM",
            email: "boone.butler@opticom.org",
            phone: "+1 (943) 451-3074",
            address: "895 Whitney Avenue, Curtice, Ohio, 150",
          },
          {
            _id: "5d99beb6ffddf4af466b7a06",
            amount: "floating(1, 4000, 2)",
            type: "income",
            name: { first: "Cathleen", last: "Brown" },
            company: "FIBEROX",
            email: "cathleen.brown@fiberox.me",
            phone: "+1 (809) 550-3045",
            address: "864 Nautilus Avenue, Tuttle, Virginia, 1619",
          },
          {
            _id: "5d99beb6d927af5635543e87",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Marcia", last: "Haley" },
            company: "SENMEI",
            email: "marcia.haley@senmei.info",
            phone: "+1 (844) 436-3094",
            address: "388 Debevoise Avenue, Denio, American Samoa, 4603",
          },
          {
            _id: "5d99beb6b0699f34547ef9cd",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Claire", last: "Curtis" },
            company: "EXOSIS",
            email: "claire.curtis@exosis.co.uk",
            phone: "+1 (960) 540-2403",
            address: "427 Covert Street, Fingerville, Florida, 3375",
          },
          {
            _id: "5d99beb61eac41d3bcaeea76",
            amount: "floating(1, 4000, 2)",
            type: "income",
            name: { first: "Gardner", last: "Burch" },
            company: "MARTGO",
            email: "gardner.burch@martgo.biz",
            phone: "+1 (966) 574-3591",
            address: "513 Lois Avenue, Sanders, Pennsylvania, 8293",
          },
          {
            _id: "5d99beb6ef3b7cd3990499d8",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Mercer", last: "Sexton" },
            company: "PUSHCART",
            email: "mercer.sexton@pushcart.net",
            phone: "+1 (999) 417-2060",
            address: "225 Vandervoort Place, Kerby, Kentucky, 9591",
          },
          {
            _id: "5d99beb6815f3f77883aaf66",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Rebecca", last: "Odonnell" },
            company: "IMKAN",
            email: "rebecca.odonnell@imkan.us",
            phone: "+1 (962) 484-3520",
            address: "895 Troy Avenue, Watchtower, New Hampshire, 9063",
          },
          {
            _id: "5d99beb6adcc0c81c5e63963",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Church", last: "Vance" },
            company: "EARBANG",
            email: "church.vance@earbang.com",
            phone: "+1 (815) 531-3967",
            address: "600 Adams Street, Dola, Connecticut, 9089",
          },
          {
            _id: "5d99beb685d74a082da6bc67",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Jocelyn", last: "Henderson" },
            company: "MATRIXITY",
            email: "jocelyn.henderson@matrixity.io",
            phone: "+1 (801) 423-2390",
            address: "781 Fairview Place, Eagleville, Georgia, 2656",
          },
          {
            _id: "5d99beb688c61720ca3ce583",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Virginia", last: "Vega" },
            company: "MITROC",
            email: "virginia.vega@mitroc.name",
            phone: "+1 (981) 544-3928",
            address: "657 Bedell Lane, Springhill, Tennessee, 5426",
          },
          {
            _id: "5d99beb6639c96a75559eeac",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Odonnell", last: "Lewis" },
            company: "GEOFORMA",
            email: "odonnell.lewis@geoforma.tv",
            phone: "+1 (996) 457-3721",
            address:
              "898 Montauk Avenue, Sehili, Northern Mariana Islands, 752",
          },
          {
            _id: "5d99beb67a6153f9b5df016e",
            amount: "floating(1, 4000, 2)",
            type: "income",
            name: { first: "Tia", last: "Best" },
            company: "KINETICUT",
            email: "tia.best@kineticut.biz",
            phone: "+1 (903) 494-3935",
            address: "760 Wallabout Street, Neahkahnie, Michigan, 5540",
          },
          {
            _id: "5d99beb6fb959e811bd36cb4",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Duran", last: "Russo" },
            company: "TROPOLIS",
            email: "duran.russo@tropolis.org",
            phone: "+1 (855) 478-2256",
            address: "967 Horace Court, Starks, Illinois, 888",
          },
          {
            _id: "5d99beb64ffa3eefb4f844ae",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Margo", last: "Gill" },
            company: "TASMANIA",
            email: "margo.gill@tasmania.me",
            phone: "+1 (815) 567-2478",
            address: "755 Haring Street, Rote, Maryland, 773",
          },
          {
            _id: "5d99beb626a11674d75bba44",
            amount: "floating(1, 4000, 2)",
            type: "income",
            name: { first: "Lyons", last: "Hobbs" },
            company: "MOMENTIA",
            email: "lyons.hobbs@momentia.info",
            phone: "+1 (992) 545-2079",
            address: "468 Rogers Avenue, Troy, District Of Columbia, 5550",
          },
          {
            _id: "5d99beb6b6d969195fff486f",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Gonzales", last: "Horn" },
            company: "TELPOD",
            email: "gonzales.horn@telpod.co.uk",
            phone: "+1 (948) 401-2653",
            address: "976 Jamison Lane, Morriston, New York, 2635",
          },
          {
            _id: "5d99beb6e28b54e75b93127f",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Larsen", last: "Merritt" },
            company: "CIRCUM",
            email: "larsen.merritt@circum.biz",
            phone: "+1 (801) 587-3681",
            address: "544 Ditmas Avenue, Stockdale, Puerto Rico, 5202",
          },
          {
            _id: "5d99beb62ddbe863c0e68462",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Bradshaw", last: "Browning" },
            company: "MAGNEMO",
            email: "bradshaw.browning@magnemo.net",
            phone: "+1 (881) 483-2401",
            address: "179 Centre Street, Worcester, Utah, 4299",
          },
          {
            _id: "5d99beb6064d6307872d67d3",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Leta", last: "Hayden" },
            company: "UNIWORLD",
            email: "leta.hayden@uniworld.us",
            phone: "+1 (842) 436-2136",
            address: "975 Irwin Street, Leming, Iowa, 4510",
          },
          {
            _id: "5d99beb6410994433c7d1eba",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Baxter", last: "Craft" },
            company: "BALUBA",
            email: "baxter.craft@baluba.com",
            phone: "+1 (858) 400-3810",
            address: "695 Quincy Street, Retsof, Arkansas, 2277",
          },
          {
            _id: "5d99beb65bf1a846313590f0",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Chen", last: "Riley" },
            company: "ECSTASIA",
            email: "chen.riley@ecstasia.io",
            phone: "+1 (944) 487-3236",
            address: "897 Devoe Street, Conestoga, Alabama, 3810",
          },
          {
            _id: "5d99beb6fc1c67e102aee9e7",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Mcfarland", last: "Clayton" },
            company: "ZENCO",
            email: "mcfarland.clayton@zenco.name",
            phone: "+1 (803) 451-2232",
            address: "545 Dumont Avenue, Woodburn, California, 1170",
          },
          {
            _id: "5d99beb63a32d412427672da",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Hernandez", last: "Lee" },
            company: "NURALI",
            email: "hernandez.lee@nurali.tv",
            phone: "+1 (819) 421-3593",
            address: "687 Luquer Street, Cade, Indiana, 8731",
          },
          {
            _id: "5d99beb61f78f116aafaad7b",
            amount: "floating(1, 4000, 2)",
            type: "income",
            name: { first: "Katina", last: "Solis" },
            company: "SLAMBDA",
            email: "katina.solis@slambda.biz",
            phone: "+1 (945) 416-3177",
            address: "583 Elton Street, Lund, Nebraska, 9403",
          },
          {
            _id: "5d99beb6abc50cae2376910a",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Tanya", last: "Hewitt" },
            company: "ZILLIDIUM",
            email: "tanya.hewitt@zillidium.org",
            phone: "+1 (885) 544-2633",
            address: "197 Tillary Street, Nash, North Carolina, 9575",
          },
          {
            _id: "5d99beb6a6c3c2ca5dcb855c",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Tillman", last: "Buchanan" },
            company: "BOILICON",
            email: "tillman.buchanan@boilicon.me",
            phone: "+1 (997) 520-2562",
            address: "741 Seigel Street, Whitestone, Delaware, 5588",
          },
          {
            _id: "5d99beb695b05943e5dd78dd",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Maria", last: "Hart" },
            company: "PYRAMI",
            email: "maria.hart@pyrami.info",
            phone: "+1 (814) 400-2126",
            address: "507 Royce Place, Makena, Oregon, 451",
          },
          {
            _id: "5d99beb6608b27c39d17ce02",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Sondra", last: "Stuart" },
            company: "CUBIX",
            email: "sondra.stuart@cubix.co.uk",
            phone: "+1 (924) 580-2223",
            address: "845 Voorhies Avenue, Defiance, Virgin Islands, 2198",
          },
          {
            _id: "5d99beb649dcf9042e8ebf3e",
            amount: "floating(1, 4000, 2)",
            type: "income",
            name: { first: "Carpenter", last: "Castillo" },
            company: "PASTURIA",
            email: "carpenter.castillo@pasturia.biz",
            phone: "+1 (886) 528-2709",
            address: "862 Colby Court, Hillsboro, Montana, 3192",
          },
          {
            _id: "5d99beb6eff39a753c169f9c",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Christina", last: "Roman" },
            company: "KINDALOO",
            email: "christina.roman@kindaloo.net",
            phone: "+1 (979) 517-2630",
            address: "379 Evans Street, Bowden, Idaho, 5871",
          },
          {
            _id: "5d99beb634e062b7a7bca29b",
            amount: "floating(1, 4000, 2)",
            type: "income",
            name: { first: "Anna", last: "Boyd" },
            company: "DANCERITY",
            email: "anna.boyd@dancerity.us",
            phone: "+1 (887) 403-2364",
            address: "183 Rockwell Place, Rosburg, New Jersey, 264",
          },
          {
            _id: "5d99beb6fd10ed3634a91a16",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Yolanda", last: "Mcdonald" },
            company: "OVATION",
            email: "yolanda.mcdonald@ovation.com",
            phone: "+1 (946) 502-2228",
            address: "889 Herbert Street, Woodlands, West Virginia, 9435",
          },
          {
            _id: "5d99beb67d581d81e0038c8e",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Kristi", last: "Wilkins" },
            company: "ZIALACTIC",
            email: "kristi.wilkins@zialactic.io",
            phone: "+1 (853) 441-3800",
            address: "391 Dahlgreen Place, Twilight, Wyoming, 5130",
          },
          {
            _id: "5d99beb654a34b0559076fe6",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Stacie", last: "Ortiz" },
            company: "KONGLE",
            email: "stacie.ortiz@kongle.name",
            phone: "+1 (828) 468-3196",
            address: "735 Bushwick Court, Ilchester, Colorado, 8597",
          },
          {
            _id: "5d99beb6b28061f866d2c339",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Bonner", last: "Carter" },
            company: "IMAGINART",
            email: "bonner.carter@imaginart.tv",
            phone: "+1 (998) 548-2731",
            address: "740 Harrison Place, Lacomb, Palau, 5392",
          },
          {
            _id: "5d99beb65814fce715011141",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Graciela", last: "Deleon" },
            company: "OVOLO",
            email: "graciela.deleon@ovolo.biz",
            phone: "+1 (841) 531-2309",
            address: "975 McKibben Street, Nicholson, South Dakota, 5431",
          },
          {
            _id: "5d99beb62061d5009c894004",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Marsha", last: "Chan" },
            company: "ENORMO",
            email: "marsha.chan@enormo.org",
            phone: "+1 (829) 501-3906",
            address: "765 Whitwell Place, Keyport, Oklahoma, 2647",
          },
          {
            _id: "5d99beb66941cc9e3e358edd",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Ladonna", last: "Bentley" },
            company: "NETPLODE",
            email: "ladonna.bentley@netplode.me",
            phone: "+1 (928) 512-3093",
            address: "606 Cambridge Place, Harrison, Vermont, 8587",
          },
          {
            _id: "5d99beb669a12f644f5139ee",
            amount: "floating(1, 4000, 2)",
            type: "outcome",
            name: { first: "Alta", last: "Thompson" },
            company: "VOLAX",
            email: "alta.thompson@volax.info",
            phone: "+1 (889) 405-2732",
            address: "357 Brighton Avenue, Dexter, New Mexico, 9046",
          },
          {
            _id: "5d99beb6d97a1b21014e5ff1",
            amount: "floating(1, 4000, 2)",
            type: "income",
            name: { first: "Ayala", last: "Conrad" },
            company: "EMTRAC",
            email: "ayala.conrad@emtrac.co.uk",
            phone: "+1 (850) 557-2894",
            address: "168 Kane Street, Laurelton, Maine, 6367",
          },
          {
            _id: "5d99beb6ccc8097475120981",
            amount: "floating(1, 4000, 2)",
            type: "investment",
            name: { first: "Glenda", last: "Lindsey" },
            company: "ECLIPSENT",
            email: "glenda.lindsey@eclipsent.biz",
            phone: "+1 (887) 479-2196",
            address: "383 Grove Street, Belvoir, Mississippi, 7175",
          },
          {
            _id: "5d99beb645a511c0f6bce20b",
            amount: "floating(1, 4000, 2)",
            type: "income",
            name: { first: "Rhodes", last: "Lyons" },
            company: "SYNKGEN",
            email: "rhodes.lyons@synkgen.net",
            phone: "+1 (943) 441-2257",
            address: "602 Conselyea Street, Rockhill, Washington, 8676",
          },
          {
            _id: "5d99beb6a22b596eaf635fd1",
            amount: "floating(1, 4000, 2)",
            type: "loan",
            name: { first: "Bond", last: "Talley" },
            company: "DIGIGEN",
            email: "bond.talley@digigen.us",
            phone: "+1 (905) 498-2315",
            address: "566 Central Avenue, Ebro, Guam, 8891",
          },
          {
            _id: "5d99beb65daa71ef83ec6f57",
            amount: "floating(1, 4000, 2)",
            type: "income",
            name: { first: "Curry", last: "Conley" },
            company: "BICOL",
            email: "curry.conley@bicol.com",
            phone: "+1 (946) 450-3173",
            address: "682 Lawrence Avenue, Gilgo, Massachusetts, 4292",
          },
          {
            _id: "5d99beb60457512fe012d3c8",
            amount: "floating(1, 4000, 2)",
            type: "income",
            name: { first: "Rhoda", last: "Pickett" },
            company: "PYRAMAX",
            email: "rhoda.pickett@pyramax.io",
            phone: "+1 (938) 546-2133",
            address: "547 Ebony Court, Rivera, Minnesota, 915",
          },
        ],
      };
      let PD = (() => {
        class e {
          constructor() {}
          getTransactions() {
            return nN;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = L({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const rN = function () {
          return { tab: "0" };
        },
        oN = function () {
          return { tab: "3" };
        },
        iN = function () {
          return { tab: "1" };
        },
        sN = function () {
          return { tab: "2" };
        };
      function uN(e, t) {
        if (
          (1 & e &&
            (as(0),
            Q(1, "tr")(2, "td", 9),
            oe(3),
            Y(),
            Q(4, "td", 9),
            oe(5),
            Y()(),
            us()),
          2 & e)
        ) {
          const n = t.$implicit;
          Te(3), mn(n.name.first), Te(2), mn(n.amount);
        }
      }
      const lN = function () {
          return { tab: "0" };
        },
        cN = function () {
          return { tab: "1" };
        },
        dN = function () {
          return { tab: "2" };
        },
        fN = function () {
          return { tab: "3" };
        },
        hN = [
          {
            path: "",
            component: (() => {
              class e {
                constructor(n) {
                  (this.transactionService = n),
                    (this.transactionResponse =
                      this.transactionService.getTransactions()),
                    (this.countIncome = this.transactionResponse.data.filter(
                      (r) => "income" === r.type
                    ).length),
                    (this.countInvestments =
                      this.transactionResponse.data.filter(
                        (r) => "investment" === r.type
                      ).length),
                    (this.countOutcome = this.transactionResponse.data.filter(
                      (r) => "outcome" === r.type
                    ).length),
                    (this.countLoans = this.transactionResponse.data.filter(
                      (r) => "loan" === r.type
                    ).length);
                }
              }
              return (
                (e.ɵfac = function (n) {
                  return new (n || e)(E(PD));
                }),
                (e.ɵcmp = Jn({
                  type: e,
                  selectors: [["app-summary-page"]],
                  decls: 51,
                  vars: 13,
                  consts: [
                    [1, "container", "mt-5"],
                    [1, "row", "justify-content-center"],
                    [1, "col"],
                    [1, "card", "text-center"],
                    [1, "card-body"],
                    [1, "card-title"],
                    [1, "card-text"],
                    ["href", "#", 1, "btn", "btn-primary"],
                    [1, "card-footer", "text-muted"],
                    [1, "row", "mt-5"],
                    [1, "card"],
                    [
                      "routerLink",
                      "/navigator",
                      1,
                      "btn",
                      "btn-primary",
                      3,
                      "queryParams",
                    ],
                  ],
                  template: function (n, r) {
                    1 & n &&
                      (Q(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(
                        4,
                        "div",
                        4
                      )(5, "h5", 5),
                      oe(6, "Welcome"),
                      Y(),
                      Q(7, "p", 6),
                      oe(
                        8,
                        " With supporting text below as a natural lead-in to addtitional content. "
                      ),
                      Y(),
                      Q(9, "a", 7),
                      oe(10, "See transactions"),
                      Y()(),
                      Q(11, "div", 8),
                      oe(12),
                      Y()()()(),
                      Q(13, "div", 9)(14, "div", 2)(15, "div", 10)(
                        16,
                        "div",
                        4
                      )(17, "h5", 5),
                      oe(18),
                      Y(),
                      Q(19, "p", 6),
                      oe(20, "Income"),
                      Y(),
                      Q(21, "a", 11),
                      oe(22, "See all"),
                      Y()()()(),
                      Q(23, "div", 2)(24, "div", 10)(25, "div", 4)(26, "h5", 5),
                      oe(27),
                      Y(),
                      Q(28, "p", 6),
                      oe(29, "Investments"),
                      Y(),
                      Q(30, "a", 11),
                      oe(31, "See all"),
                      Y()()()()(),
                      Q(32, "div", 9)(33, "div", 2)(34, "div", 10)(
                        35,
                        "div",
                        4
                      )(36, "h5", 5),
                      oe(37),
                      Y(),
                      Q(38, "p", 6),
                      oe(39, "Outcome"),
                      Y(),
                      Q(40, "a", 11),
                      oe(41, "See all"),
                      Y()()()(),
                      Q(42, "div", 2)(43, "div", 10)(44, "div", 4)(45, "h5", 5),
                      oe(46),
                      Y(),
                      Q(47, "p", 6),
                      oe(48, "Loans"),
                      Y(),
                      Q(49, "a", 11),
                      oe(50, "See all"),
                      Y()()()()()()),
                      2 & n &&
                        (Te(12),
                        fs(
                          " You have ",
                          r.transactionResponse.total,
                          " transactions "
                        ),
                        Te(6),
                        mn(r.countIncome),
                        Te(3),
                        Ct("queryParams", Yt(9, rN)),
                        Te(6),
                        mn(r.countInvestments),
                        Te(3),
                        Ct("queryParams", Yt(10, oN)),
                        Te(7),
                        mn(r.countOutcome),
                        Te(3),
                        Ct("queryParams", Yt(11, iN)),
                        Te(6),
                        mn(r.countLoans),
                        Te(3),
                        Ct("queryParams", Yt(12, sN)));
                  },
                  dependencies: [ai],
                  encapsulation: 2,
                })),
                e
              );
            })(),
          },
          {
            path: "navigator",
            component: (() => {
              class e {
                constructor(n, r) {
                  (this.transactionService = n),
                    (this.route = r),
                    (this.transactionResponse =
                      this.transactionService.getTransactions());
                }
                ngOnInit() {
                  this.route.queryParams.subscribe((n) => {
                    switch (
                      ((this.currentActiveParam = n.tab),
                      this.currentActiveParam)
                    ) {
                      case "0":
                        this.filteredTransaction =
                          this.transactionResponse.data.filter(
                            (r) => "income" === r.type
                          );
                        break;
                      case "1":
                        this.filteredTransaction =
                          this.transactionResponse.data.filter(
                            (r) => "outcome" === r.type
                          );
                        break;
                      case "2":
                        this.filteredTransaction =
                          this.transactionResponse.data.filter(
                            (r) => "loan" === r.type
                          );
                        break;
                      case "3":
                        this.filteredTransaction =
                          this.transactionResponse.data.filter(
                            (r) => "investment" === r.type
                          );
                    }
                  });
                }
              }
              return (
                (e.ɵfac = function (n) {
                  return new (n || e)(E(PD), E(En));
                }),
                (e.ɵcmp = Jn({
                  type: e,
                  selectors: [["app-navigator"]],
                  decls: 26,
                  vars: 17,
                  consts: [
                    [1, "container", "mt-5"],
                    [1, "row"],
                    [1, "col"],
                    [1, "nav", "nav-tabs", "justify-content-center"],
                    [1, "nav-item"],
                    [
                      "routerLink",
                      "/navigator",
                      1,
                      "nav-link",
                      3,
                      "queryParams",
                    ],
                    [1, "table"],
                    ["scope", "col", 1, "text-center"],
                    [4, "ngFor", "ngForOf"],
                    [1, "text-center"],
                  ],
                  template: function (n, r) {
                    1 & n &&
                      (Q(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "ul", 3)(
                        4,
                        "li",
                        4
                      )(5, "a", 5),
                      oe(6, "Income"),
                      Y()(),
                      Q(7, "li", 4)(8, "a", 5),
                      oe(9, "Outcome"),
                      Y()(),
                      Q(10, "li", 4)(11, "a", 5),
                      oe(12, "Loans"),
                      Y()(),
                      Q(13, "li", 4)(14, "a", 5),
                      oe(15, "Investments"),
                      Y()()()()(),
                      Q(16, "div", 1)(17, "table", 6)(18, "thead")(19, "tr")(
                        20,
                        "th",
                        7
                      ),
                      oe(21, "Name"),
                      Y(),
                      Q(22, "th", 7),
                      oe(23, "Amount"),
                      Y()()(),
                      Q(24, "tbody"),
                      (function Up(e, t, n, r, o, i, s, a) {
                        const u = v(),
                          l = U(),
                          c = e + 22,
                          d = l.firstCreatePass
                            ? (function cE(e, t, n, r, o, i, s, a, u) {
                                const l = t.consts,
                                  c = _r(t, e, 4, s || null, un(l, a));
                                il(t, n, c, un(l, u)), Ei(t, c);
                                const d = (c.tViews = ol(
                                  2,
                                  c,
                                  r,
                                  o,
                                  i,
                                  t.directiveRegistry,
                                  t.pipeRegistry,
                                  null,
                                  t.schemas,
                                  l
                                ));
                                return (
                                  null !== t.queries &&
                                    (t.queries.template(t, c),
                                    (d.queries = t.queries.embeddedTView(c))),
                                  c
                                );
                              })(c, l, u, t, n, r, o, i, s)
                            : l.data[c];
                        Nt(d, !1);
                        const f = u[V].createComment("");
                        Wi(l, u, f, d),
                          Oe(f, u),
                          es(u, (u[c] = Sp(f, u, f, d))),
                          Ci(d) && nl(l, u, d),
                          null != s && rl(u, d, a);
                      })(25, uN, 6, 2, "ng-container", 8),
                      Y()()()()),
                      2 & n &&
                        (Te(5),
                        Or("active", "0" === r.currentActiveParam),
                        Ct("queryParams", Yt(13, lN)),
                        Te(3),
                        Or("active", "1" === r.currentActiveParam),
                        Ct("queryParams", Yt(14, cN)),
                        Te(3),
                        Or("active", "2" === r.currentActiveParam),
                        Ct("queryParams", Yt(15, dN)),
                        Te(3),
                        Or("active", "3" === r.currentActiveParam),
                        Ct("queryParams", Yt(16, fN)),
                        Te(11),
                        Ct("ngForOf", r.filteredTransaction));
                  },
                  dependencies: [Wy, ai],
                  encapsulation: 2,
                })),
                e
              );
            })(),
          },
        ];
      let pN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = An({ type: e })),
            (e.ɵinj = sn({ imports: [xD.forRoot(hN), xD] })),
            e
          );
        })(),
        gN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = An({ type: e, bootstrap: [tN] })),
            (e.ɵinj = sn({ imports: [fA, pN] })),
            e
          );
        })();
      (function NM() {
        Dy = !1;
      })(),
        dA()
          .bootstrapModule(gN)
          .catch((e) => console.error(e));
    },
  },
  (te) => {
    te((te.s = 863));
  },
]);
