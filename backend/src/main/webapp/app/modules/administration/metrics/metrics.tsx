import React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Progress, Row, Table } from 'reactstrap';
import {
  CacheMetrics,
  DatasourceMetrics,
  GarbageCollectorMetrics,
  HttpRequestMetrics,
  JvmMemory,
  JvmThreads,
  EndpointsRequestsMetrics,
  SystemMetrics,
  Translate
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_TIMESTAMP_FORMAT, APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT, APP_WHOLE_NUMBER_FORMAT } from 'app/config/constants';
import { systemMetrics, systemThreadDump } from '../administration.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IMetricsPageProps extends StateProps, DispatchProps {}

export interface IMetricsPageState {
  showModal: boolean;
}

export class MetricsPage extends React.Component<IMetricsPageProps, IMetricsPageState> {
  state: IMetricsPageState = {
    showModal: false
  };

  componentDidMount() {
    this.props.systemMetrics();
    this.props.systemThreadDump();
  }

  getMetrics = () => {
    if (!this.props.isFetching) {
      this.props.systemMetrics();
      this.props.systemThreadDump();
    }
  };

  render() {
    const { metrics, threadDump, isFetching } = this.props;
    return (
      <div>
        <h2 id="metrics-page-heading">Application Metrics</h2>
        <p>
          <Button onClick={this.getMetrics} color={isFetching ? 'btn btn-danger' : 'btn btn-primary'} disabled={isFetching}>
            <FontAwesomeIcon icon="sync" />
            &nbsp; Refresh
          </Button>
        </p>
        <hr />

        <Row>
          <Col sm="12">
            <h3>JVM Metrics</h3>
            <Row>
              <Col md="4">
                {metrics && metrics.jvm ? <JvmMemory jvmMetrics={metrics.jvm} wholeNumberFormat={APP_WHOLE_NUMBER_FORMAT} /> : ''}
              </Col>
              <Col md="4">{threadDump ? <JvmThreads jvmThreads={threadDump} wholeNumberFormat={APP_WHOLE_NUMBER_FORMAT} /> : ''}</Col>
              <Col md="4">
                {metrics && metrics.processMetrics ? (
                  <SystemMetrics
                    systemMetrics={metrics.processMetrics}
                    wholeNumberFormat={APP_WHOLE_NUMBER_FORMAT}
                    timestampFormat={APP_TIMESTAMP_FORMAT}
                  />
                ) : (
                  ''
                )}
              </Col>
            </Row>
          </Col>
        </Row>

        {metrics && metrics.garbageCollector ? (
          <GarbageCollectorMetrics garbageCollectorMetrics={metrics.garbageCollector} wholeNumberFormat={APP_WHOLE_NUMBER_FORMAT} />
        ) : (
          ''
        )}
        {metrics && metrics['http.server.requests'] ? (
          <HttpRequestMetrics
            requestMetrics={metrics['http.server.requests']}
            twoDigitAfterPointFormat={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT}
            wholeNumberFormat={APP_WHOLE_NUMBER_FORMAT}
          />
        ) : (
          ''
        )}
        {metrics && metrics.endpointsRequests ? (
          <EndpointsRequestsMetrics endpointsRequestsMetrics={metrics.endpointsRequests} wholeNumberFormat={APP_WHOLE_NUMBER_FORMAT} />
        ) : (
          ''
        )}

        {metrics.cache ? (
          <Row>
            <Col sm="12">
              <CacheMetrics cacheMetrics={metrics.cache} twoDigitAfterPointFormat={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT} />
            </Col>
          </Row>
        ) : (
          ''
        )}

        {metrics.databases ? (
          <Row>
            <Col sm="12">
              <DatasourceMetrics
                datasourceMetrics={metrics.databases}
                twoDigitAfterPointFormat={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT}
              />
            </Col>
          </Row>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  metrics: storeState.administration.metrics,
  isFetching: storeState.administration.loading,
  threadDump: storeState.administration.threadDump
});

const mapDispatchToProps = { systemMetrics, systemThreadDump };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetricsPage);
